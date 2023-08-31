import React from "react";

export default function PasswordIcon({
  className,
}: { className: string } & React.ComponentPropsWithRef<"svg">) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 6C8.75 4.20507 10.2051 2.75 12 2.75C13.7949 2.75 15.25 4.20507 15.25 6V8H16C16.2563 8 16.5071 8.02411 16.75 8.0702V6C16.75 3.37665 14.6234 1.25 12 1.25C9.37665 1.25 7.25 3.37665 7.25 6V8.0702C7.49294 8.02411 7.74365 8 8 8H8.75V6Z"
      />
      <path
        opacity="0.4"
        d="M4 12C4 9.79086 5.79086 8 8 8H16C18.2091 8 20 9.79086 20 12V18C20 20.2091 18.2091 22 16 22H8C5.79086 22 4 20.2091 4 18V12Z"
      />
      <circle cx="12" cy="15" r="2" />
    </svg>
  );
}
