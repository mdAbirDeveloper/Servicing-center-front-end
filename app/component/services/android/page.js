/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

// New Android data structure
const androidBrands = [
  {
    brand: "Samsung",

    series: [
      {
        name: "Galaxy S Series",
        models: [
          {
            name: "Galaxy S25",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra-sm-s938.jpg",
          },
          {
            name: "Galaxy S25 Plus",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra-sm-s938.jpg",
          },
          {
            name: "Galaxy S25 Ultra",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s25-ultra-sm-s938.jpg",
          },
          {
            name: "Galaxy S24",
            img: "https://www.custommacbd.com/cdn/shop/files/samsung-galaxy-s24-jade-green-Custom-Mac-BD.png?v=1706354010",
          },
          {
            name: "Galaxy S24 Plus",
            img: "https://adminapi.applegadgetsbd.com/storage/media/large/Galaxy-S24-Ultra-Titanium-Black-1587.jpg",
          },
          {
            name: "Galaxy S24 Ultra",
            img: "https://rajshahitech.com/wp-content/uploads/2024/01/Samsung-Galaxy-S24-Ultra-violet-new.webp",
          },
          {
            name: "Galaxy S23",
            img: "https://www.custommacbd.com/cdn/shop/products/Galaxy-S23-Ultra-Phantom-Black-Custom-Mac-BD.jpg?v=1675423377",
          },
          {
            name: "Galaxy S23 Plus",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqqoak63qmK9xsFsxoZ8dtPXoBvEkH3CPNag&s",
          },
          {
            name: "Galaxy S23 Ultra",
            img: "https://www.excelestore.com.bd/public/uploads/all/jgMosu41Gfx32OjVZXFgq2Ar8SHc81v7z5YwUkql.webp",
          },
        ],
      },
      {
        name: "Galaxy A Series",
        models: [
          {
            name: "Galaxy A56 5G",
            img: "https://mobilebuzzbd.com/wp-content/uploads/2025/03/Samsung-Galaxy-A56-Graphite.jpg",
          },
          {
            name: "Galaxy A36 5G",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a36.jpg",
          },
          {
            name: "Galaxy A26 5G",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a26.jpg",
          },
          {
            name: "Galaxy A55",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg",
          },
          {
            name: "Galaxy A54",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a54.jpg",
          },
          {
            name: "Galaxy A34",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a34.jpg",
          },
          {
            name: "Galaxy A14 5G",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a14-5g.jpg",
          },
          {
            name: "Galaxy A15 5G",
            img: "https://cdn.shopz.com.bd/2024/08/Samsung-Galaxy-A15-2.jpg",
          },
          {
            name: "Galaxy A25 5G",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN5HcEpIetzUrpo4M6M8w8NhTBMnXPARKB0g&s",
          },
          {
            name: "Galaxy A35 5G",
            img: "https://www.gizmochina.com/wp-content/uploads/2023/11/Samsung-Galaxy-A35.png",
          },
        ],
      },
      {
        name: "Galaxy M Series",
        models: [
          {
            name: "Galaxy M56 5G",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg_BE8iPp1yjzXi9tSAGtTGl6TCXTSL87oeA&s",
          },
          {
            name: "Galaxy M55 5G",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m55.jpg",
          },
          {
            name: "Galaxy M54 5G",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvQ-OpjanYdnnLFm_Ltg8__kitoyZn_sSt-Q&s",
          },
          {
            name: "Galaxy M34 5G",
            img: "https://ddfndelma2gpn.cloudfront.net/color/772/samsung_galaxy_m34_Prism_Silver_.webp",
          },
          {
            name: "Galaxy M14 5G",
            img: "https://microless.com/cdn/products/918818b54fc03b4b2b2ad042a3410cb4-hi.jpg",
          },
          {
            name: "Galaxy M33 5G",
            img: "https://fonezone.me/cdn/shop/products/Untitled_4_199d753b-44d9-4e2e-8e71-9cc080f57dfd.jpg?v=1718019187",
          },
          {
            name: "Galaxy M32",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m32.jpg",
          },
          {
            name: "Galaxy M31",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE2V4SA1Aw8y9P-Kh_WPeZU-uEnNDfv097Rw&s",
          },
          {
            name: "Galaxy M21",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m21.jpg",
          },
          {
            name: "Galaxy M12",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m12.jpg",
          },
          {
            name: "Galaxy M11",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3gu27uJe0IngavQQVz0N8-WjzxoAP37gBBA&s",
          },
        ],
      },
      {
        name: "Galaxy Z Series",
        models: [
          {
            name: "Galaxy Z Fold 7",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold7.jpg",
          },
          {
            name: "Galaxy Z Flip 7",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip7.jpg",
          },
          {
            name: "Galaxy Z Fold 6",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold6.jpg",
          },
          {
            name: "Galaxy Z Flip 6",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip6.jpg",
          },
          {
            name: "Galaxy Z Fold 5",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold5.jpg",
          },
          {
            name: "Galaxy Z Flip 5",
            img: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-flip5.jpg",
          },
        ],
      },
    ],
  },
  {
    brand: "Xiaomi",
    series: [
      {
        name: "Mi Series",
        models: [
          {
            name: "Xiaomi 14 Ultra",
            img: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra.jpg",
          },
          {
            name: "Xiaomi 13",
            img: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-13.jpg",
          },
        ],
      },
    ],
  },
  {
    brand: "Oppo",
    series: [
      {
        name: "Find X Series",
        models: [
          {
            name: "Oppo Find X7 Ultra",
            img: "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x7-ultra.jpg",
          },
        ],
      },
    ],
  },
  {
    brand: "Vivo",
    series: [
      {
        name: "X Series",
        models: [
          {
            name: "Vivo X100 Pro",
            img: "https://fdn2.gsmarena.com/vv/bigpic/vivo-x100-pro.jpg",
          },
        ],
      },
    ],
  },
  {
    brand: "Realme",
    series: [
      {
        name: "GT Series",
        models: [
          {
            name: "Realme GT 6",
            img: "https://fdn2.gsmarena.com/vv/bigpic/realme-gt6.jpg",
          },
        ],
      },
    ],
  },
  {
    brand: "OnePlus",
    series: [
      {
        name: "OnePlus Series",
        models: [
          {
            name: "OnePlus 12",
            img: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg",
          },
        ],
      },
    ],
  },
  {
    brand: "Huawei",
    series: [
      {
        name: "P Series",
        models: [
          {
            name: "Huawei P70 Ultra",
            img: "https://fdn2.gsmarena.com/vv/bigpic/huawei-p70-ultra.jpg",
          },
        ],
      },
    ],
  },
];

const commonProblems = [
  "Screen Replacement",
  "Battery Replacement",
  "Charging Port Repair",
  "Camera Repair",
  "Speaker / Microphone Issue",
  "Network / Signal Problem",
  "Software Update / Restore",
  "Other",
];

export default function AndroidServicePage() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [openModel, setOpenModel] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [customProblem, setCustomProblem] = useState({});
  const [search, setSearch] = useState("");

  const toggleDropdown = (modelName) => {
    setOpenModel(openModel === modelName ? null : modelName);
  };

  const filteredBrands = androidBrands
    .filter((b) => b.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (a.brand > b.brand ? 1 : -1)); // Alphabetically

  return (
    <div className="mx-auto p-4 max-w-[1400px] relative z-0">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {selectedBrand ? `${selectedBrand.brand} Series` : "Android Service"}
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Company..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!selectedBrand && (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
          {filteredBrands.map((brandObj, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-sm border border-gray-200 hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 hover:-translate-y-2 transform transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{brandObj.brand}</h2>
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedBrand(brandObj)}
                  >
                    View Series
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBrand && !selectedSeries && (
        <>
          <button
            className="btn btn-sm btn-outline mb-6"
            onClick={() => setSelectedBrand(null)}
          >
            ← Back to Brands
          </button>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
            {selectedBrand.series
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((seriesObj, idx) => (
                <div
                  key={idx}
                  className="card bg-base-100 shadow-sm border border-gray-200 hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 hover:-translate-y-2 transform transition-all duration-300"
                >
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{seriesObj.name}</h2>
                    <div className="card-actions mt-4">
                      <button
                        className="btn btn-primary"
                        onClick={() => setSelectedSeries(seriesObj)}
                      >
                        View Models
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {selectedSeries && (
        <>
          <button
            className="btn btn-sm btn-outline mb-6"
            onClick={() => setSelectedSeries(null)}
          >
            ← Back to Series
          </button>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
            {selectedSeries.models
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((model, idx) => (
                <div
                  key={idx}
                  className="card bg-base-100 shadow-sm border border-gray-200 hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 hover:-translate-y-2 transform transition-all duration-300"
                  style={{ alignSelf: "flex-start" }}
                >
                  <figure className="px-6 pt-6">
                    <img
                      src={model.img}
                      alt={model.name}
                      className="rounded-xl object-contain h-40"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{model.name}</h2>
                    <div className="card-actions mt-4">
                      <button
                        className={`btn ${
                          openModel === model.name ? "btn-error" : "btn-primary"
                        }`}
                        onClick={() => toggleDropdown(model.name)}
                      >
                        {openModel === model.name
                          ? "Hide Problems"
                          : "Select Model"}
                      </button>
                    </div>

                    {openModel === model.name && (
                      <div className="mt-4 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Select Problem
                        </label>
                        <select
                          className="select select-bordered w-full"
                          value={selectedProblem[model.name] || ""}
                          onChange={(e) =>
                            setSelectedProblem({
                              ...selectedProblem,
                              [model.name]: e.target.value,
                            })
                          }
                        >
                          <option value="" disabled>
                            -- Choose a problem --
                          </option>
                          {commonProblems.map((problem, index) => (
                            <option key={index} value={problem}>
                              {problem}
                            </option>
                          ))}
                        </select>

                        {selectedProblem[model.name] === "Other" && (
                          <textarea
                            className="textarea textarea-bordered w-full mt-3"
                            placeholder="Describe your problem..."
                            value={customProblem[model.name] || ""}
                            onChange={(e) =>
                              setCustomProblem({
                                ...customProblem,
                                [model.name]: e.target.value,
                              })
                            }
                          />
                        )}

                        {selectedProblem[model.name] &&
                          selectedProblem[model.name] !== "Other" && (
                            <p className="mt-2 text-sm text-green-600 font-medium">
                              Selected: {selectedProblem[model.name]}
                            </p>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
