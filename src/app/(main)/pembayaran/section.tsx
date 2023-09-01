"use client";
import { appConfig } from "@/constant/appConfig";
import { useGetServicesQuery } from "@/redux/feature/information/services/servicesSlice";
import { Services } from "@/types/services";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-hot-toast";
export default function ServicesSection() {
  const { data: resServices } = useGetServicesQuery(null);
  const dataServices = resServices?.data;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [disable, setdisable] = useState(false);
  const { data: session }: any = useSession();

  const handleTopUp = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const post = await fetch(`${appConfig.urlApiNutech}/transaction`, {
        method: "POST",
        body: JSON.stringify({
          service_code: value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      const res = await post.json();

      if (res.status == 102 && res.message == "Saldo tidak mencukupi") {
        setLoading(false);
        toast.error("Saldo anda tidak mencukupi, silahkan melakukan top up");
      }
      if (res.status == 0) {
        setLoading(false);
        toast.success("Transaksi Berhasil");
        setdisable(true);
      }
      if (
        res.status == 102 &&
        res.message == "Parameter service_code harus di isi"
      ) {
        setLoading(false);
        toast.error("Service tidak boleh kosong");
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
      <form
        onSubmit={handleTopUp}
        className="flex gap-2 mt-4 flex-col w-[300px]"
      >
        <Select
          disabled={disable}
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          startContent={<h1 className="capitalize text-xs flex">{value}</h1>}
          size="sm"
          label="Pilih Services"
          color="primary"
        >
          {dataServices?.map((e: Services, i: number) => {
            return (
              <SelectItem
                variant="faded"
                key={e?.service_code}
                value={e.service_name}
              >
                <div className="flex gap-2">
                  <Image
                    height={50}
                    width={50}
                    src={e?.service_icon}
                    alt={e.service_name}
                  />
                  <div>
                    <h1>{`${e?.service_tariff}`}</h1>
                    <h1>{e?.service_name}</h1>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </Select>
        <Button disabled={disable} type="submit" color={"primary"}>
          {loading ? <Spinner color="white" size="sm" /> : "Kirim"}
        </Button>
      </form>
    </div>
  );
}
