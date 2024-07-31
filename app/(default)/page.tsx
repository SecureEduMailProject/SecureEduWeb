import DownloadPage from "@/pages/download";

export const metadata = {
  title: "SecureEduMail - Web",
  description: "SecureEduMail\n" +
      "Une plateforme éducative sécurisée pour les étudiants et les enseignants.",
};

import Hero from "@/components/hero-home";
import BusinessCategories from "@/components/business-categories";
import FeaturesPlanet from "@/components/features-planet";
import LargeTestimonial from "@/components/large-testimonial";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <BusinessCategories />
      <FeaturesPlanet />
      <LargeTestimonial />
      <Cta />
    </>
  );
}
