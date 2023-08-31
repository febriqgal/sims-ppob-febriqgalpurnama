"use client";
import React from "react";
import { useGetBannersQuery } from "@/redux/feature/information/banner/bannerSlice";
import { Image } from "@nextui-org/react";
import { Banner } from "@/types/banner";
export default function BannerSection() {
  const { data, isLoading } = useGetBannersQuery(null);
  const dataBanner = data?.data;
  console.log(dataBanner);

  return (
    <div className="grid grid-cols-5 w-full gap-4">
      {dataBanner?.map((e: Banner, i: any) => {
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
  );
}
