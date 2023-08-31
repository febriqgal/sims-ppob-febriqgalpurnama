"use client";
import { useGetProfileQuery } from "@/redux/feature/membership/profile/profileSlice";
import { useGetBalanceQuery } from "@/redux/feature/transaction/balance/balanceSlice";
import { Balance } from "@/types/balance";
import { Profile } from "@/types/profile";
import { Avatar } from "@nextui-org/avatar";
import { Skeleton } from "@nextui-org/react";
import { useState } from "react";
import InvisibleIcon from "../icons/invisible";
import VisibleIcon from "../icons/visible";
export default function WelcomeSaldoSection() {
  const { data: resBalance, isLoading: loadingBalance } =
    useGetBalanceQuery(null);
  const { data: resProfile, isLoading: loadingProfile } =
    useGetProfileQuery(null);
  const dataProfile: Profile = resProfile?.data;
  const dataBalance: Balance = resBalance?.data;
  const [hide, setHide] = useState(true);

  return (
    <div className="grid grid-cols-2 w-full text-center ">
      <div className="text-start h-full flex justify-between flex-col">
        <Avatar
          src="https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-6/369876590_1790509264741935_6177425535217714656_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeE38CXCmoIPBnCL4rJ3pHWsdfI0h832Kpd18jSHzfYql0Pl4M-Dzbh5kqzptyxTkmOumI5FESd1JAnEg_pEJw5o&_nc_ohc=-BEFUH6PNP4AX_A0PTY&_nc_ht=scontent-xsp1-3.xx&oh=00_AfA1uEaZzbHA0-MZMqjp3qYirXIEiKARTfD3HdMIR0gBhg&oe=64F4D7C0"
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
      <div className="bg-primary text-start flex gap-2 py-5 flex-col justify-start px-10 rounded-xl text-white">
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
