// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <Provider store={store}>{children}</Provider>
      </NextUIProvider>
    </SessionProvider>
  );
}
