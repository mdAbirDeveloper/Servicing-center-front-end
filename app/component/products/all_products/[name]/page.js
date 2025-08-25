/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryPage({ params }) {
  const { name } = params;
  const [categoryData, setCategoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [loading, setLoading] = useState(true);
  const [showBrands, setShowBrands] = useState(false); // 🔹 Dropdown toggle

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

  // 🔹 Fetch category data
  useEffect(() => {
    if (name) {
      setLoading(true);
      fetch(`https://servicing-center-server.vercel.app/api/v1/product/categories/${name}`)
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
    }
  }, [name]);

  // 🔹 Filter products by company
  // 🔹 Filter products by company
  const handleCompanyFilter = (company) => {
    setSelectedCompany(company);

    // ✅ Dropdown auto close on selection
    setShowBrands(false);

    if (company === "") {
      setFilteredData(categoryData); // show all products
    } else {
      const filtered = categoryData.filter((item) => item.company === company);
      setFilteredData(filtered);
    }
  };

  // 🔹 Clear filter
  const clearFilter = () => {
    setSelectedCompany("");
    setFilteredData(categoryData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-3">
        Home &gt; Shop &gt; <span className="capitalize">{name}</span>
      </p>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        <span className="text-orange-600 uppercase">{name}</span>{" "}
        <span className="text-gray-800">
          {"=>"} Explore Our Latest Collection
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filter */}
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

          {/* Dropdown Toggle for Mobile */}
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

          {/* Company Filter */}
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
                    onChange={() => handleCompanyFilter(company)}
                  />
                  <label htmlFor={company} className="cursor-pointer">
                    {company}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              {/* Modern Stylish Loading Spinner */}
              <div className="flex justify-center items-center h-64">
                <div className="relative flex justify-center items-center">
                  {/* Outer Ring */}
                  <div className="w-12 h-12 border-4 border-transparent border-t-primary border-l-primary rounded-full animate-spin"></div>

                  {/* Inner Ring */}
                  <div className="absolute w-8 h-8 border-4 border-transparent border-b-primary border-r-primary rounded-full animate-spin-slow"></div>

                  {/* Dot Pulse in Center */}
                  <div className="absolute w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>
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
  );
}
