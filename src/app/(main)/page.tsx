import BannerSection from "@/components/sections/banner";
import ServicesSection from "@/components/sections/services";
import WelcomeSaldoSection from "@/components/sections/welcomeSaldo";
export default function Home() {
  return (
    <main className="flex gap-8 flex-col justify-center items-center  ">
      <WelcomeSaldoSection />
      <ServicesSection />
      <BannerSection />
    </main>
  );
}
