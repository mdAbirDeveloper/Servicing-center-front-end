/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const images = ["/carousel_1.webp", "/carousel_2.webp", "/carousel_3.webp"];

export default function Products() {
  const [current, setCurrent] = useState(0);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [showBrands, setShowBrands] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // 🔹 Companies list
  const companies = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Realme",
    "Oppo",
    "Vivo",
    "OnePlus",
    "Nokia",
    "Sony",
    "Huawei",
    "Motorola",
    "LG",
    "Asus",
    "Lenovo",
    "Tecno",
    "Itel",
    "Infinix",
    "Google",
    "Oraimo",
    "Anker",
    "JBL",
    "Sony Accessories",
    "Bose",
    "Skullcandy",
    "Sennheiser",
    "Remax",
    "Baseus",
    "Ugreen",
    "Xcentz",
    "Spigen",
    "OtterBox",
    "Caseology",
    "Ringke",
    "Other",
  ];

  // 🔹 Categories list
  const categories = [
    {
      name: "Headphone",
      image:
        "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/30049973/2024/7/3/d704a743-99d8-488a-a85e-4b89d8fa3f671719987456439-Noise-4-Overhead-Wireless-Headphone---Carbon-Black-984171998-1.jpg",
    },
    {
      name: "Speaker",
      image: "https://m.media-amazon.com/images/I/81wdmgabXFL._AC_SL1500_.jpg",
    },
    {
      name: "Protector_Glass",
      image:
        "https://www.mytrendyphone.co.uk/images/Mocolo-Full-Size-Tempered-Glass-Screen-Protector-for-Samsung-Galaxy-A50-9H-15032019-01-p.webp",
    },
    {
      name: "iPhone_Parts",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEaXNO-X-3XISyFh7bDmXSNNWDyyeNpcF9sA&s",
    },
    {
      name: "Android_Phone_Parts",
      image:
        "https://cdn.vectorstock.com/i/1000v/56/70/smartphone-smart-phone-parts-repair-maintenance-vector-57005670.jpg",
    },
    {
      name: "Charger",
      image:
        "https://i0.wp.com/baseus.com.bd/wp-content/uploads/2024/07/Baseus-Charger-GaN5-25W-mini-For-Samsung-S24-S23-S21-S20-Google-Pixel-Iphone-15-Series-With-Type-c-Cable-US-P1011090B113-s.jpg?fit=500%2C500&ssl=1",
    },
    {
      name: "Power_Bank",
      image:
        "https://gearybd.com/wp-content/uploads/2024/07/Anker-A1384H11-30W-20000mAh-Powe-3.png",
    },
    {
      name: "Smart_Watch",
      image: "https://m.media-amazon.com/images/I/613vdOoh4oL._AC_SL1500_.jpg",
    },
  ];

  // 🔹 Carousel next/prev
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 2000);
    return () => clearInterval(timer);
  }, []);

  // 🔹 Fetch products
  useEffect(() => {
    setLoading(true);
    fetch(`https://servicing-center-server.vercel.app/api/v1/product/all-products`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryData(data.data || []);
        setFilteredData(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔹 Clear filter
  const clearFilter = () => {
    setSelectedCompany("");
    setSelectedCategory("");
    setFilteredData(categoryData);
  };

  // 🔹 Filter logic
  useEffect(() => {
    let filtered = categoryData;

    if (selectedCompany) {
      filtered = filtered.filter((item) => item.company === selectedCompany);
    }

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredData(filtered);
  }, [selectedCompany, selectedCategory, categoryData]);

  return (
    <div>
      {/* 🔹 Carousel */}
      <div className="relative w-full md:h-[500px] overflow-hidde">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex items-center justify-center bg-primary"
            >
              <img
                src={src}
                alt={`slide-${index}`}
                className="object-contain h-full"
              />
            </div>
          ))}
        </div>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 🔹 Categories Section */}
      <section className="md:py-10 md:mt-20 mt-6">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">
          <span className="text-orange-500">Featured</span> Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/component/products/all_products/${cat.name}`}
            >
              <div
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md cursor-pointer 
          transform transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <h3 className="text-lg font-medium">{cat.name}</h3>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔹 All Products */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          <span className="text-orange-600 uppercase">
            {selectedCategory || selectedCompany || "All"}
          </span>{" "}
          <span className="text-gray-800">
            {"=>"} Explore Our Latest Collection
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* 🔹 Sidebar Filter */}
          <aside className="bg-white rounded-xl shadow-md p-4 h-fit sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Refine</h3>
              <button
                onClick={clearFilter}
                className="text-sm text-gray-500 border px-2 py-1 rounded hover:bg-gray-100"
              >
                Clear ✕
              </button>
            </div>

            {/* Company Filter (with mobile dropdown) */}
            <button
              onClick={() => setShowBrands(!showBrands)}
              className="md:hidden w-full border px-3 py-2 rounded text-gray-700 flex justify-between items-center mb-4"
            >
              <span>{selectedCompany || "Select Brand"}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showBrands ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className={`mb-6 ${showBrands ? "block" : "hidden"} md:block`}>
              <h4 className="text-sm font-semibold mb-2">Brand</h4>
              <ul className="space-y-2 text-sm text-gray-700 max-h-72 overflow-y-auto custom-scrollbar">
                {companies.map((company, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="company"
                      id={company}
                      checked={selectedCompany === company}
                      onClick={() => setShowBrands(!showBrands)}
                      onChange={() => setSelectedCompany(company)}
                    />
                    <label htmlFor={company} className="cursor-pointer">
                      {company}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category Filter (with mobile dropdown) */}
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="md:hidden w-full border px-3 py-2 rounded text-gray-700 flex justify-between items-center mb-4"
            >
              <span>{selectedCategory || "Select Category"}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showCategories ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`mb-6 ${showCategories ? "block" : "hidden"} md:block`}
            >
              <h4 className="text-sm font-semibold mb-2">Category</h4>
              <ul className="space-y-2 text-sm text-gray-700 max-h-72 overflow-y-auto custom-scrollbar">
                {categories.map((cat, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      id={cat.name}
                      checked={selectedCategory === cat.name}
                      onClick={() => setShowCategories(!showCategories)}
                      onChange={() => setSelectedCategory(cat.name)}
                    />
                    <label htmlFor={cat.name} className="cursor-pointer">
                      {cat.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* 🔹 Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                {/* Spinner */}
                <div className="relative flex justify-center items-center">
                  <div className="w-12 h-12 border-4 border-transparent border-t-primary border-l-primary rounded-full animate-spin"></div>
                  <div className="absolute w-8 h-8 border-4 border-transparent border-b-primary border-r-primary rounded-full animate-spin-slow"></div>
                  <div className="absolute w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : filteredData.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredData.map((item, index) => (
                  <Link key={index} href={`/component/products/all_products/product_details/${item._id}`}>
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow hover:shadow-2xl hover:shadow-primary transition transform hover:-translate-y-2 p-3 relative"
                    >
                      {/* Discount Badge */}
                      {item.discountPrice && item.price && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          -
                          {Math.round(
                            ((item.price - item.discountPrice) / item.price) *
                              100
                          )}
                          %
                        </span>
                      )}

                      {/* Product Image */}
                      <div className="w-full h-40 sm:h-48 flex items-center justify-center">
                        <img
                          src={item.image.image}
                          alt={item.title}
                          className="max-h-full object-contain"
                        />
                      </div>

                      {/* Product Title */}
                      <h3 className="text-sm font-medium mt-3 text-gray-800 line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Price */}
                      <div className="mt-2">
                        {item.price && (
                          <p className="text-gray-400 line-through text-sm">
                            {item.price} TK
                          </p>
                        )}
                        <p className="text-lg font-semibold text-orange-600">
                          {item.discountPrice} TK
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-2xl text-center uppercase font-bold font-serif text-amber-500">
                no product found within your criteria !!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
