import { Skeleton } from "@nextui-org/react";
import React from "react";

export default function AkunSkeleton() {
  return (
    <div className="space-y-4 flex justify-center flex-col items-center w-[300px]">
      <Skeleton className="  h-[100px] w-[100px] rounded-full">
        <div className="h-4  rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-[200px] rounded-lg">
        <div className="h-4  rounded-lg bg-default-200" />
      </Skeleton>
      {[1, 2, 3].map((i) => {
        return (
          <div key={i} className="space-y-2 w-full flex flex-col items-start">
            <Skeleton className="w-[70px] rounded-lg">
              <div className="h-4  rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-full h-[39px]  rounded-lg">
              <div className="h-4  rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        );
      })}

      <div className="w-full space-y-2">
        {[1, 2].map((i) => {
          return (
            <Skeleton key={i} className="w-full h-[40px]  rounded-lg">
              <div className="h-4  rounded-lg bg-default-200" />
            </Skeleton>
          );
        })}
      </div>
    </div>
  );
}
