import { appConfig } from "@/constant/appConfig";
import { Metadata } from "next";
import AkunSection from "./Section";

export const metadata: Metadata = {
  title: `Akun | ${appConfig.title}`,
  description: "Generated by create next app",
};
export default function AkunPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <AkunSection />
    </div>
  );
}