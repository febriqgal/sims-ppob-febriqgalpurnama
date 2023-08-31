"use client";
const dayjs = require("dayjs");
import { useGetHistoryQuery } from "@/redux/feature/transaction/history/historySlice";
import { History } from "@/types/history";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

export default function HistorySection() {
  const { data: resHistory } = useGetHistoryQuery(null);
  const historyy = resHistory?.data?.records;
  console.log(historyy);
  const [page, setPage] = useState(1);
  const rowsPerPage = 1;

  const pages = Math.ceil(historyy?.length / rowsPerPage);

  useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return historyy?.slice(start, end);
  }, [page, historyy]);
  return (
    <div className="flex items-start justify-start flex-col w-full ">
      <h1>Semua Transaksi</h1>
      <Table
        color="primary"
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn>Total</TableColumn>
          <TableColumn align="center">No. Invoice</TableColumn>
          <TableColumn align="center" className="text-center">
            Deskripsi
          </TableColumn>
        </TableHeader>
        <TableBody>
          {historyy?.map((e: History, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <h1
                    className={
                      e.transaction_type == "PAYMENT"
                        ? "text-red-500 font-bold"
                        : "text-green-500 font-bold"
                    }
                  >
                    {e.transaction_type == "PAYMENT"
                      ? `- ${e.total_amount}`
                      : `+ ${e.total_amount}`}
                  </h1>
                  <h1 className="text-xs">
                    {dayjs(e.created_on).format("DD MMMM YYYY HH:MM")} WIB
                  </h1>
                </TableCell>
                <TableCell align="center">{e.invoice_number}</TableCell>
                <TableCell align="center" className="text-center">
                  {e.description}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
