"use client";
const dayjs = require("dayjs");
import { useGetHistoryQuery } from "@/redux/feature/transaction/history/historySlice";
import { History } from "@/types/history";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function HistorySection() {
  const { data: resHistory } = useGetHistoryQuery(null);
  const historyy = resHistory?.data?.records;

  return (
    <div className="flex gap-4 items-start justify-start flex-col w-full ">
      <h1>Semua Transaksi</h1>
      <Table
        color="primary"
        aria-label="Example table with client side pagination"
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
