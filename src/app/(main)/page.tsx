import BannerSection from "@/app/(main)/SectionBanner";
import ServicesSection from "@/app/(main)/SectionServices";
import WelcomeSaldoSection from "@/app/(main)/SectionWelcomeAndSaldo";
export default function Home() {
  return (
    <main className="flex gap-8 flex-col justify-center items-center ">
      <WelcomeSaldoSection />
      <ServicesSection />
      <BannerSection />
    </main>
  );
}
