/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function CategoryPage({ params }) {
  const { title: category } = params;
  const [productsData, setProductsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [showCompanies, setShowCompanies] = useState(false);

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

  // 🔹 Fetch category products
  useEffect(() => {
    if (!category) return;

    setLoading(true);
    fetch(
      `https://servicing-center-server.vercel.app/api/v1/product/category-products?category=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProductsData(data.data || []);
        setFilteredData(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  // 🔹 Filter logic (company)
  useEffect(() => {
    let filtered = productsData;
    if (selectedCompany) {
      filtered = filtered.filter((p) => p.company === selectedCompany);
    }
    setFilteredData(filtered);
  }, [selectedCompany, productsData]);

  const clearFilter = () => {
    setSelectedCompany("");
    setShowCompanies(false);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 🔹 Sidebar Filter */}
        <aside className="bg-white rounded-xl shadow-md p-4 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Filter by Brand</h3>
            <button
              onClick={clearFilter}
              className="text-sm text-gray-500 border px-2 py-1 rounded hover:bg-gray-100"
            >
              Clear ✕
            </button>
          </div>

          {/* Company Filter */}
          <button
            onClick={() => setShowCompanies(!showCompanies)}
            className="md:hidden w-full border px-3 py-2 rounded text-gray-700 flex justify-between items-center mb-4"
          >
            <span>{selectedCompany || "Select Brand"}</span>
            <span
              className={`${
                showCompanies ? "rotate-180" : ""
              } transition-transform`}
            >
              &#9660;
            </span>
          </button>

          <div className={`${showCompanies ? "block" : "hidden"} md:block`}>
            <ul className="space-y-2 text-sm text-gray-700 max-h-72 overflow-y-auto">
              {companies.map((company, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="company"
                    id={company}
                    checked={selectedCompany === company}
                    onChange={() => {
                      setSelectedCompany(company);
                      setShowCompanies(false); // 🔹 Mobile dropdown auto close
                    }}
                  />
                  <label htmlFor={company} className="cursor-pointer">
                    {company}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* 🔹 Products Grid */}
        <div className="md:col-span-3">
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          )}
        </div>
      </div>
    </div>
  );
}
