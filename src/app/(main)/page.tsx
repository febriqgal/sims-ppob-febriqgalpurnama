import { Banner } from "@/types/banner";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import { Services } from "../../types/services";
import BtnLogin from "@/components/btnLogin";
export default async function Home() {
  const resBanner = await fetch(`${process.env.URL_APP}/api/banner`);
  const resServices = await fetch(`${process.env.URL_APP}/api/services`);
  const banner = await resBanner.json();
  const Services = await resServices.json();
  const DataServices = Services.data;
  const Databanner = banner.data;
  console.log(Databanner);
  console.log(DataServices);

  return (
    <main className="flex gap-8 flex-col justify-center items-center  ">
      <BtnLogin />
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
      <div className="grid grid-cols-12 w-full  gap-4">
        {DataServices.map((e: Services, i: number) => {
          return (
            <div key={i}>
              <Image
                width={200}
                height={200}
                src={e.service_icon}
                alt={e.service_code}
              />
              <h1 className="text-xs text-ellipsis text-center">
                {e.service_name}
              </h1>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-5 w-full gap-4">
        {Databanner.map((e: Banner, i: any) => {
          return (
            <div key={i}>
              <Image
                width={300}
                height={200}
                src={e.banner_image}
                alt={e.banner_name}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
