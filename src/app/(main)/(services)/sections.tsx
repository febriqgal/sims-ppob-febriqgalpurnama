"use client";
import { useGetServicesQuery } from "@/redux/feature/information/services/servicesSlice";
import { useGetBalanceQuery } from "@/redux/feature/transaction/balance/balanceSlice";
import { Balance } from "@/types/balance";
import { Services } from "@/types/services";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-hot-toast";
export default function ServicesSection({ noService }: { noService: number }) {
  const { data: resServices } = useGetServicesQuery(null);
  const { data: resBalance } = useGetBalanceQuery(null);
  const dataBalance: Balance = resBalance?.data;
  const dataServices: Services = resServices?.data[noService];
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [disable, setdisable] = useState(false);
  const { data: session }: any = useSession();

  const handleTopUp = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const post = await fetch(
        `https://take-home-test-api.nutech-integrasi.app/transaction`,
        {
          method: "POST",
          body: JSON.stringify({
            service_code: value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      const res = await post.json();
      if (dataBalance?.balance <= dataServices.service_tariff) {
        setLoading(false);
        toast.error("Saldo anda tidak mencukupi, silahkan melakukan top up");
        setdisable(true);
      }
      if (res.status == 0) {
        setLoading(false);
        toast.success("Transaksi Berhasil");
        setdisable(true);
      }
      if (res.status == 102) {
        setLoading(false);
        toast.error("Service ataus Layanan tidak ditemukan");
      }
      if (res.status == 108) {
        setLoading(false);
        toast.error("Token tidak tidak valid atau kadaluwarsa");
        setdisable(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Terjadi kesalahan tidak terduga, silahkan coba lagi.");
      setdisable(true);
    }
  };
  return (
    <div className="text-start">
      <h1>Pembayaran</h1>
      <div className="flex items-center gap-2">
        <Image
          width={50}
          height={50}
          src={dataServices?.service_icon}
          alt={dataServices?.service_name}
        />
        <h1 className="text-2xl font-bold">{dataServices?.service_name}</h1>
      </div>
      <form
        onSubmit={handleTopUp}
        className="flex gap-2 mt-4 flex-col w-[300px]"
      >
        <Select
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          size="sm"
          label="Pilih Nominal"
          color="primary"
        >
          <SelectItem
            key={dataServices?.service_code}
            value={dataServices?.service_code}
          >
            {`${dataServices?.service_tariff}`}
          </SelectItem>
        </Select>
        <Button disabled={disable} type="submit" color={"primary"}>
          {loading ? <Spinner color="white" size="sm" /> : "Kirim"}
        </Button>
      </form>
    </div>
  );
}
