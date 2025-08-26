/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";

const iphoneSeries = [
  { series: "iPhone 5 Series", slug: "5", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-5-ofic.jpg" },
  { series: "iPhone 6 Series", slug: "6", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111940_SP705-iphone_6-mul.png" },
  { series: "iPhone 7 Series", slug: "7", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111943_iphone7-rosegold.png" },
  { series: "iPhone 8 Series", slug: "8", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-8.jpg" },
  { series: "iPhone X Series", slug: "x", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg" },
  { series: "iPhone 11 Series", slug: "11", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg" },
  { series: "iPhone 12 Series", slug: "12", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg" },
  { series: "iPhone 13 Series", slug: "13", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg" },
  { series: "iPhone 14 Series", slug: "14", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg" },
  { series: "iPhone 15 Series", slug: "15", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg" },
  { series: "iPhone 16 Series", slug: "16", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg" },
];

export default function IPhoneSeriesPage() {
  const router = useRouter();

  return (
    <div className="mx-auto p-4 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-8 text-center">iPhone Service</h1>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
        {[...iphoneSeries]?.reverse().map((series, idx) => (
          <div
            key={idx}
            className="card shadow-sm border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2"
          >
            <figure className="px-6 pt-6">
              <img src={series.img} alt={series.series} className="rounded-xl object-contain h-40" />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title">{series.series}</h2>
              <button
                className="btn bg-primary text-white mt-4"
                onClick={() => router.push(`/component/services/iphone/${series.slug}`)}
              >
                View Models
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
