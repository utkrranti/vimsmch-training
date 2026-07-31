import HeroCarousel from "@/components/home/HeroCarousel";
import { getSettings } from "@/lib/db/settings";

export default async function HeroSection() {
  const settings = await getSettings(["prospectus.pdfUrl"]);

  return <HeroCarousel prospectusUrl={settings["prospectus.pdfUrl"]} />;
}
