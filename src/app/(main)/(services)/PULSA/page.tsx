import WelcomeSaldoSection from "@/components/sections/welcomeAndSaldo";
import ServicesSection from "../sections";

export default function ServicesPage() {
  return (
    <div>
      <WelcomeSaldoSection />
      <ServicesSection noService={3} />
    </div>
  );
}
