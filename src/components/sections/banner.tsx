"use client";
import { useGetBannersQuery } from "@/redux/feature/information/banner/bannerSlice";
import { Banner } from "@/types/banner";
import { Image } from "@nextui-org/react";
import BannerSkeleton from "../skeleton/banner";
export default function BannerSection() {
  const { data, isLoading } = useGetBannersQuery(null);
  const dataBanner = data?.data;
  if (isLoading) {
    return <BannerSkeleton />;
  }
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
