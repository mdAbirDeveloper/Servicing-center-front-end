/* eslint-disable @next/next/no-img-element */
import { Smartphone, Headphones, Cpu, Battery, RefreshCw, Shield } from "lucide-react";

export default function FeaturesSection() {
  const featuresLeft = [
    {
      icon: <Smartphone className="w-7 h-7 text-purple-500" />,
      title: "Premium Smartphones",
      desc: "Explore our collection of the latest iPhone & Android devices at unbeatable prices."
    },
    {
      icon: <Battery className="w-7 h-7 text-purple-500" />,
      title: "Battery & Accessories",
      desc: "High-quality batteries, chargers, and accessories for all smartphone models."
    },
    {
      icon: <RefreshCw className="w-7 h-7 text-purple-500" />,
      title: "Exchange & Upgrade",
      desc: "Easily exchange your old phone and upgrade to the latest model hassle-free."
    },
  ];

  const featuresRight = [
    {
      icon: <Headphones className="w-7 h-7 text-purple-500" />,
      title: "Headphones & Speakers",
      desc: "Premium wireless headphones, earbuds, and Bluetooth speakers for the best sound experience."
    },
    {
      icon: <Cpu className="w-7 h-7 text-purple-500" />,
      title: "Phone Repair Services",
      desc: "Expert repair services for iPhone & Android with original spare parts guaranteed."
    },
    {
      icon: <Shield className="w-7 h-7 text-purple-500" />,
      title: "Extended Warranty",
      desc: "Enjoy peace of mind with extended warranty options for all your purchases."
    },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium">
          Why Choose Us 🔥
        </span>

        {/* Heading */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
          Best Place for iPhone, Android & Accessories
        </h2>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          We provide premium smartphones, accessories, and top-notch repair services
          with 100% customer satisfaction.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 items-center">
          {/* Left Features */}
          <div className="space-y-6">
            {featuresLeft.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center relative">
            <div className="absolute w-72 h-72 bg-purple-100 rounded-full blur-2xl opacity-40"></div>
            <img
              src="https://img.freepik.com/premium-photo/technician-repairing-smartphone-motherboard-lab-concept-computer-hardware-mobile-phone-electronic-repairing-upgrade-technology-man-showing-process-phone-repair-workshop_180731-163.jpg"
              alt="Smartphones"
              className="relative z-10 w-72 md:w-96 drop-shadow-lg"
            />
          </div>

          {/* Right Features */}
          <div className="space-y-6">
            {featuresRight.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
