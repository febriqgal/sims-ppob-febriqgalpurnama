import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function BannerSkeleton() {
  return (
    <div className="hidden sm:grid grid-cols-5 w-full h-[94px] gap-4">
      <Skeleton className="w-full   rounded-lg">
        <div className="h-4  rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-full  rounded-lg">
        <div className="h-4  rounded-lg bg-default-200" />
      </Skeleton>{" "}
      <Skeleton className="w-full  rounded-lg">
        <div className="h-4  rounded-lg bg-default-200" />
      </Skeleton>{" "}
      <Skeleton className="w-full  rounded-lg">
        <div className="h-4  rounded-lg bg-default-200" />
      </Skeleton>{" "}
      <Skeleton className="w-full  rounded-lg">
        <div className="h-4  rounded-lg bg-default-200" />
      </Skeleton>
    </div>
  );
}
