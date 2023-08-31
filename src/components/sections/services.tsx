"use client";
import { useGetServicesQuery } from "@/redux/feature/information/services/servicesSlice";
import { Services } from "@/types/services";
import { Image } from "@nextui-org/react";
export default function ServicesSection() {
  const services = useGetServicesQuery(null);
  const dataServices = services.data?.data;
  console.log(dataServices);

  return (
    <div className="grid grid-cols-12 w-full  gap-4">
      {dataServices?.map((e: Services, i: number) => {
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
  );
}
