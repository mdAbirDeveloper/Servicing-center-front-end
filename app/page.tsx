import Products from "../app/component/products/all_products/page";
import HeroSection from "../app/component/home/page";
import FeaturesSection from "../app/component/features/page";
import About from "../app/component/about/page";
import ContactUs from "../app/component/contact_us/page";
import AndroidServicePage from "../app/component/services/android/page";
import IPhoneServicePage from "../app/component/services/iphone/page";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AndroidServicePage />
      <IPhoneServicePage />
      <Products />
      <About />
      <ContactUs />
    </div>
  );
}
