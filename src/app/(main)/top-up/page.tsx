"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button, Select, SelectItem } from "@nextui-org/react";

export default function TopUPPage() {
  return (
    <div className="flex  gap- items-start justify-center">
      <div className="w-full flex flex-col gap-8">
        <div className="grid grid-cols-2   w-full text-center ">
          <div className="text-start h-full flex justify-between flex-col">
            <Avatar color="primary" />
            <div>
              <h1>Selamat Datang</h1>
              <h1 className="text-2xl font-bold">Febriqgal Purnama</h1>
            </div>
          </div>
          <div className="bg-primary text-start flex gap-2 py-5 flex-col justify-center px-10 rounded-xl text-white">
            <h1>Saldo Anda</h1>
            <h1 className="text-2xl font-bold">Rp. 999.999.000</h1>
            <h1>Tutup Saldo</h1>
          </div>
        </div>
        <div className="text-start">
          <h1>Silahkan Masukkan</h1>
          <h1 className="text-2xl font-bold">Nominal Top UP</h1>
          <form className="flex gap-2 mt-4 flex-col w-[300px]">
            <Select size="sm" label="Pilih Nominal" color="primary">
              <SelectItem key={1} value={2312}>
                10.000
              </SelectItem>
              <SelectItem key={2} value={2312}>
                20.000
              </SelectItem>
              <SelectItem key={3} value={2312}>
                50.000
              </SelectItem>
              <SelectItem key={4} value={2312}>
                100.000
              </SelectItem>
              <SelectItem key={5} value={2312}>
                250.000
              </SelectItem>
              <SelectItem key={6} value={2312}>
                500.000
              </SelectItem>
            </Select>
            <Button color="primary">Kirim</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
