"use client";
import { useGetProfileQuery } from "@/redux/feature/membership/profile/profileSlice";
import { useGetBalanceQuery } from "@/redux/feature/transaction/balance/balanceSlice";
import { Profile } from "@/types/profile";
import { Avatar } from "@nextui-org/avatar";
import { Skeleton } from "@nextui-org/react";
export default function WelcomeSaldoSection() {
  const resBalance = useGetBalanceQuery(null);
  const resProfile = useGetProfileQuery(null);
  const dataProfile: Profile = resProfile.data?.data;
  const dataBalance = resBalance.data;

  return (
    <div className="grid grid-cols-2 w-full text-center ">
      <div className="text-start h-full flex justify-between flex-col">
        <Avatar color="primary" />
        <div>
          <h1>Selamat Datang</h1>
          <h1>{dataProfile?.email}</h1>
          <h1>{dataProfile?.first_name + " " + dataProfile?.last_name}</h1>
        </div>
      </div>
      <div className="bg-primary text-start flex gap-2 py-5 flex-col justify-center px-10 rounded-xl text-white">
        <h1>Saldo Anda</h1>
        {dataBalance?.data?.balance != null ? (
          <h1 className="text-2xl font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(dataBalance?.data.balance)}
          </h1>
        ) : (
          <Skeleton className="w-[100px]  rounded-lg">
            <div className="h-4  rounded-lg bg-default-200"></div>
          </Skeleton>
        )}

        <h1>Tutup Saldo</h1>
      </div>
    </div>
  );
}
