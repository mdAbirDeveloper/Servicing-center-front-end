/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* HeroSection.tsx */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const images = ["/carousel_1.webp", "/carousel_2.webp", "/carousel_3.webp"];
  const [current, setCurrent] = useState(0);

  // 🔹 Carousel next/prev
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000); // 3 sec interval
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 pb-10 pt-11 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Expert{" "}
            <span className="text-yellow-400 underline decoration-white/50 decoration-4">
              Apple & Android
            </span>{" "}
            Servicing
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-md">
            Get your devices repaired quickly and safely. We also offer the
            latest accessories and products for Apple & Android devices.
          </p>
          <div className="flex flex-wrap gap-4 relative z-10">
            <Link
              href="/component/services/iphone"
              className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 shadow-lg transition transform hover:-translate-y-1"
            >
              Apple Service
            </Link>
            <Link
              href="/component/services/android"
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow-lg transition-transform duration-300 hover:-translate-y-1 pointer-events-auto"
            >
              Android Service
            </Link>
            <Link
              href="/component/products/all_products"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 shadow-lg transition transform hover:-translate-y-1"
            >
              Shop Products
            </Link>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative lg:w-1/2 w-full overflow-hidden rounded-3xl shadow-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-blue-700 to-indigo-500 p-6"
              >
                <img
                  src={src}
                  alt={`slide-${index}`}
                  className="object-contain w-full h-64 sm:h-80 md:h-96 rounded-2xl shadow-lg"
                />
              </div>
            ))}
          </div>

          {/* Left Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
          >
            <ChevronRight size={28} />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  current === idx ? "bg-yellow-400" : "bg-white/50"
                } cursor-pointer`}
                onClick={() => setCurrent(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
