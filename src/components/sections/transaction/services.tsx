"use client";
import { useGetServicesQuery } from "@/redux/feature/information/services/servicesSlice";
import { Button, Select, SelectItem, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import { toast } from "react-hot-toast";
export default function ServicesTransactionSection() {
  const { data } = useGetServicesQuery(null);
  console.log(data);

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [disable, setdisable] = useState(false);
  const { data: session }: any = useSession();
  console.log(session?.user?.token);

  const handleTopUp = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://take-home-test-api.nutech-integrasi.app/topup`,
        {
          method: "POST",
          body: JSON.stringify({
            top_up_amount: value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );
      setLoading(false);
      setdisable(true);
      toast.success("Berhasil Top UP");
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-start">
      <h1>Silahkan Masukkan</h1>

      <h1 className="text-2xl font-bold">Nominal Top UP</h1>
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
