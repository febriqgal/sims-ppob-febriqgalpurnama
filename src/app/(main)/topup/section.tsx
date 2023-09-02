"use client";
import { appConfig } from "@/constant/appConfig";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-hot-toast";
export default function TopupSection() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [disable, setdisable] = useState(false);
  const { data: session }: any = useSession();

  const handleTopUp = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${appConfig.urlApiNutech}/topup`, {
        method: "POST",
        body: JSON.stringify({
          top_up_amount: value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${session?.user?.token}`,
        },
      });

      const resTopUp = await res.json();
      if (resTopUp.status == 0) {
        setLoading(false);
        toast.success("Berhasil Top UP");
        setdisable(true);
      }
      if (resTopUp.status == 102) {
        setLoading(false);
        toast.error(
          "Parameter top up hanya boleh angka dan tidak boleh lebih kecil dari 0"
        );
      }
      if (resTopUp.status == 108) {
        setLoading(false);
        toast.error("Token tidak tidak valid atau kadaluwarsa");
      }
    } catch (error) {}
  };
  return (
    <div className="text-start">
      <h1>Silahkan Masukkan</h1>

      <h1 className="text-2xl font-bold">Nominal Top UP</h1>
      <form
        onSubmit={handleTopUp}
        className="flex gap-2 mt-4 flex-col w-full sm:w-[300px]"
      >
        <Select
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          size="sm"
          label="Pilih Nominal"
          color="primary"
        >
          <SelectItem key={10000} value={10000}>
            10.000
          </SelectItem>
          <SelectItem key={20000} value={20000}>
            20.000
          </SelectItem>
          <SelectItem key={50000} value={50000}>
            50.000
          </SelectItem>
          <SelectItem key={100000} value={100000}>
            100.000
          </SelectItem>
          <SelectItem key={250000} value={250000}>
            250.000
          </SelectItem>
          <SelectItem key={500000} value={500000}>
            500.000
          </SelectItem>
        </Select>
        <Button disabled={disable} type="submit" color={"primary"}>
          {loading ? <Spinner color="white" size="sm" /> : "Kirim"}
        </Button>
      </form>
    </div>
  );
}
