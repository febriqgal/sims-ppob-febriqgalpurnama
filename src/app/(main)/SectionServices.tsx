"use client";
import { useGetServicesQuery } from "@/redux/feature/information/services/servicesSlice";
import { Services } from "@/types/services";
import { Image, Spinner } from "@nextui-org/react";
import Link from "next/link";
export default function ServicesSection() {
  const { data: resServices, isLoading: loadingServices } =
    useGetServicesQuery(null);
  const dataServices = resServices?.data;

  return (
    <>
      {loadingServices ? (
        <div>
          <Spinner color="primary" />
        </div>
      ) : (
        <div className="grid grid-cols-4  sm:grid-cols-12 w-full  gap-4">
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
