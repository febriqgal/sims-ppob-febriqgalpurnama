import React from "react";

export default function WalletIcon({
  className,
}: { className: string } & React.ComponentPropsWithRef<"svg">) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M22 6H6C3.79086 6 2 7.79086 2 10V18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6Z"
      />
      <path d="M22 6C22 3.79086 20.2091 2 18 2H12C9.79086 2 8 3.79086 8 6H22Z" />
      <path d="M2 12L2 16L6 16C7.10457 16 8 15.1046 8 14C8 12.8954 7.10457 12 6 12L2 12Z" />
    </svg>
  );
}
