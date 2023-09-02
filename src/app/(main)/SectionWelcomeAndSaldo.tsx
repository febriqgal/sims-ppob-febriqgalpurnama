"use client";
import { useGetProfileQuery } from "@/redux/feature/membership/profile/profileSlice";
import { useGetBalanceQuery } from "@/redux/feature/transaction/balance/balanceSlice";
import { Balance } from "@/types/balance";
import { Profile } from "@/types/profile";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import PhotoProfile from "../../../public/Profile Photo.png";
import InvisibleIcon from "../../components/Atoms/icons/invisible";
import VisibleIcon from "../../components/Atoms/icons/visible";

import { signOut } from "next-auth/react";

export default function WelcomeSaldoSection() {
  const { data: resBalance, isLoading: loadingBalance } =
    useGetBalanceQuery(null);
  const {
    data: resProfile,
    isLoading: loadingProfile,
    isError: errorProfile,
  } = useGetProfileQuery(null);
  const dataProfile: Profile = resProfile?.data;
  const dataBalance: Balance = resBalance?.data;
  const [hide, setHide] = useState(true);
  if (loadingProfile) {
    return (
      <div className="flex justify-center items-center">
        <Spinner color="white" />
      </div>
    );
  }

  if (errorProfile) {
    return (
      <div className="flex flex-col gap-4 justify-center">
        <h1>Token anda Sudah Kadaluarsa, Silahkan Login ulang. 😉</h1>

        <Button
          onPress={async () => {
            await signOut();
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }}
          color="primary"
          variant="shadow"
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full text-center ">
      <div className="text-start h-full flex justify-between flex-col">
        <Image
          src={PhotoProfile}
          height={50}
          width={50}
          alt="#"
          color="primary"
        />
        <div>
          <h1>Selamat Datang</h1>
          {loadingProfile ? (
            <Skeleton className="w-[200px]  rounded-lg">
              <div className="h-4  rounded-lg bg-default-200" />
            </Skeleton>
          ) : (
            <h1 className="font-bold text-2xl">
              {dataProfile?.first_name + " " + dataProfile?.last_name}
            </h1>
          )}
        </div>
      </div>
      <div className="bg-primary mt-4 sm:mt-0 text-start flex gap-2 py-5 flex-col justify-start px-10 rounded-xl text-white">
        <h1>Saldo Anda</h1>
        {loadingBalance ? (
          <Skeleton className="w-[100px]  rounded-lg">
            <div className="h-4  rounded-lg bg-default-200" />
          </Skeleton>
        ) : (
          <>
            {hide ? (
              <h1 className="text-2xl font-bold">Rp - - - - - -</h1>
            ) : (
              <h1 className="text-2xl font-bold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(dataBalance?.balance)}
              </h1>
            )}
          </>
        )}
        <button
          className="w-fit"
          onClick={() => {
            setHide(!hide);
          }}
        >
          {hide ? (
            <InvisibleIcon className="h-6 fill-white" />
          ) : (
            <VisibleIcon className="h-6 fill-white" />
          )}
        </button>
      </div>
    </div>
  );
}
