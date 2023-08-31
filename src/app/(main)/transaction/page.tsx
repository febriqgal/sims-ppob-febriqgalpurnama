"use client";
import WelcomeSaldoSection from "@/components/sections/welcomeSaldo";
import { useGetHistoryQuery } from "@/redux/feature/transaction/history/historySlice";
import React from "react";

export default function Transaction() {
  const { data } = useGetHistoryQuery(null);
  const history = data?.data;
  console.log(history?.records);

  return (
    <div className="flex flex-col   items-center justify-center">
      <WelcomeSaldoSection />
      <div>
        <h1>History</h1>
        {history?.records.map((e: any, i: any) => {
          console.log(e);
          return (
            <div key={i}>
              <h1>{e.invoice_number}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
