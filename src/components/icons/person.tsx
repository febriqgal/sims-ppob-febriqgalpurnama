import React from "react";

export default function PersonIcon({
  className,
}: { className: string } & React.ComponentPropsWithRef<"svg">) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse opacity="0.4" cx="12" cy="17" rx="7" ry="4" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
