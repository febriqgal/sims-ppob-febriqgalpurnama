import HistorySection from "@/app/(main)/transaction/section";
import WelcomeSaldoSection from "@/app/(main)/SectionWelcomeAndSaldo";
import { appConfig } from "@/constant/appConfig";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Transaction | ${appConfig.title}`,
  description: "Generated by create next app",
};
export default function Transaction() {
  return (
    <div className="flex gap-8 flex-col items-center justify-center">
      <WelcomeSaldoSection />
      <HistorySection />
    </div>
  );
}