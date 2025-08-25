/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const aboutImageUrl = "/images/iphone-android-servicing.jpg";

const AboutUs = () => {
  return (
    <div className="bg-white font-sans max-w-[1200px] mx-auto">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="absolute top-[-2rem] left-[-2rem] w-36 h-36 bg-purple-100 rounded-full z-0 animate-pulse"></div>
            <div className="absolute bottom-[-1rem] right-[-1rem] w-24 h-24 bg-blue-100 rounded-full z-0 animate-pulse"></div>

            <img
              src="https://niotech-nextjs.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout%2FaboutThumb1_1.png&w=640&q=75"
              alt="Mobile Servicing Experts"
              className="rounded-xl shadow-2xl bg-blue-100 relative z-10 mx-auto"
            />

            {/* Customer Satisfaction Card */}
            <div className="absolute bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg w-48 z-20 hidden sm:block">
              <p className="text-gray-600 text-sm font-semibold">
                Customer Satisfaction
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
              <p className="text-right text-gray-800 font-bold text-lg mt-1">
                95%
              </p>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              About Our Company
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Your Trusted Mobile Servicing & Accessories Shop
            </h1>

            <p className="text-gray-600 text-lg mb-8">
              We provide top-quality iPhone and Android mobile servicing
              solutions. Our expert technicians solve any issue quickly and
              efficiently. We also offer 100% genuine mobile accessories for all
              brands.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Fast servicing by experienced technicians.
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  100% genuine parts and accessories guaranteed.
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  Special warranty on all servicing.
                </span>
              </div>
            </div>

            <Link href={"/component/services/iphone"}>
              <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-purple-700 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                Explore Our Services &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
