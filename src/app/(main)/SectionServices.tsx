"use client";
import { useGetServicesQuery } from "@/redux/feature/information/services/servicesSlice";
import { Services } from "@/types/services";
import { Image, Skeleton } from "@nextui-org/react";
import Link from "next/link";
export default function ServicesSection() {
  const { data: resServices, isLoading: loadingServices } =
    useGetServicesQuery(null);
  const dataServices = resServices?.data;

  return (
    <>
      {loadingServices ? (
        <div className="grid grid-cols-12 h-[79px] w-full  gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
            return (
              <Skeleton key={i} className="w-full rounded-lg">
                <div className="h-4  rounded-lg bg-default-200" />
              </Skeleton>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-12 w-full  gap-4">
          {dataServices?.map((e: Services, i: number) => {
            return (
              <Link href={`/pembayaran`} key={e.service_code}>
                <Image
                  width={200}
                  height={200}
                  src={e.service_icon}
                  alt={e.service_code}
                />
                <h1 className="text-xs text-ellipsis text-center">
                  {e.service_name}
                </h1>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
