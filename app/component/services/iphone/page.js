/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const iphoneSeries = [
  {
    series: "iPhone 5 Series",
    models: [
      { name: "iPhone 5", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-5-ofic.jpg" },
      { name: "iPhone 5s", img: "https://londonmagicstore.co.uk/cdn/shop/products/03f50586-4449-448b-8802-a1ff11bde599_800x.jpg?v=1624448208" },
      { name: "iPhone SE (1st Gen)", img: "https://fonezone.me/cdn/shop/products/ses_3e182887-2761-4a91-8ccc-af32291fefc0.jpg?v=1719926848&width=416" },
    ],
  },
  {
    series: "iPhone 6 Series",
    models: [
      { name: "iPhone 6", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111940_SP705-iphone_6-mul.png" },
      { name: "iPhone 6 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-6-plus.jpg" },
      { name: "iPhone 6s", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-6s.jpg" },
      { name: "iPhone 6s Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-6s-plus.jpg" },
    ],
  },
  {
    series: "iPhone 7 Series",
    models: [
      { name: "iPhone 7", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111943_iphone7-rosegold.png" },
      { name: "iPhone 7 Plus", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111943_iphone7-plus-rosegold.png" },
    ],
  },
  {
    series: "iPhone 8 Series",
    models: [
      { name: "iPhone 8", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-8.jpg" },
      { name: "iPhone 8 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-8-plus.jpg" },
    ],
  },
  {
    series: "iPhone X Series",
    models: [
      { name: "iPhone X", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg" },
      { name: "iPhone XR", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr-new.jpg" },
      { name: "iPhone XS", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs.jpg" },
      { name: "iPhone XS Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs-max.jpg" },
    ],
  },
  {
    series: "iPhone 11 Series",
    models: [
      { name: "iPhone 11", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg" },
      { name: "iPhone 11 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg" },
      { name: "iPhone 11 Pro Max", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBPDnyA8O0zjuS7_qYJkiZNL-0m5nUqWPtYQ&s" },
      { name: "iPhone SE (2nd Gen)", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2020.jpg" },
    ],
  },
  {
    series: "iPhone 12 Series",
    models: [
      { name: "iPhone 12", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg" },
      { name: "iPhone 12 Mini", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-mini.jpg" },
      { name: "iPhone 12 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro.jpg" },
      { name: "iPhone 12 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro-max.jpg" },
    ],
  },
  {
    series: "iPhone 13 Series",
    models: [
      { name: "iPhone 13", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg" },
      { name: "iPhone 13 Mini", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg" },
      { name: "iPhone 13 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg" },
      { name: "iPhone 13 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg" },
    ],
  },
  {
    series: "iPhone 14 Series",
    models: [
      { name: "iPhone 14", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg" },
      { name: "iPhone 14 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-plus.jpg" },
      { name: "iPhone 14 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg" },
      { name: "iPhone 14 Pro Max", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxgRh_y06335yEg1a1FRgJI_AJNIDCAYxSZA&s" },
    ],
  },
  {
    series: "iPhone 15 Series",
    models: [
      { name: "iPhone 15", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg" },
      { name: "iPhone 15 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg" },
      { name: "iPhone 15 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg" },
      { name: "iPhone 15 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg" },
    ],
  },
  {
    series: "iPhone 16 Series",
    models: [
      { name: "iPhone 16", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg" },
      { name: "iPhone 16 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg" },
      { name: "iPhone 16 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg" },
      { name: "iPhone 16 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg" },
    ],
  },
];

const commonProblems = [
  "Screen Replacement",
  "Battery Replacement",
  "Charging Port Repair",
  "Camera Repair",
  "Speaker / Microphone Issue",
  "Face ID / Touch ID Problem",
  "Water Damage Repair",
  "Overheating Issue",
  "No Display / Black Screen",
  "Software Update / Restore",
  "Network / Signal Problem",
  "Back Glass Replacement",
  "Frame Damage Repair",
  "Other",
];

// 🧰 helper: localStorage থেকে user বের করা (বিভিন্ন শেপ সাপোর্ট করে)
function getCurrentUserFromLocalStorage() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const data = JSON.parse(raw);

    // সম্ভাব্য শেপগুলো: {user}, {data}, {admin}, অথবা টপ-লেভেলেই ফিল্ড
    const u = data.user || data.data || data.admin || data;
    return {
      name: u.name || u.fullName || "",
      email: u.email || "",
      phone: u.phone || u.phoneNumber || "",
    };
  } catch {
    return null;
  }
}

export default function IPhoneServicePage() {
  const router = useRouter();

  const [selectedSeries, setSelectedSeries] = useState(null);
  const [openModel, setOpenModel] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [customProblem, setCustomProblem] = useState({});
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState({ type: "", text: "" });

  const toggleDropdown = (model) => {
    setOpenModel(openModel === model ? null : model);
  };

  const showFlash = (type, text) => {
    setFlash({ type, text });
    setTimeout(() => setFlash({ type: "", text: "" }), 30000);
  };

  const canShowSubmit = (modelName) => {
    const chosen = selectedProblem[modelName];
    const custom = customProblem[modelName];
    if (chosen === "Other") {
      return (custom || "").trim().length > 0;
    }
    return !!chosen;
  };

  const handleSubmit = async (modelName) => {
    const user = getCurrentUserFromLocalStorage();
    if (!user || !(user.email || user.phone)) {
      showFlash("error", "Please login first.");
      router.push("/component/authentication/login");
      return;
    }

    const problem =
      selectedProblem[modelName] === "Other"
        ? (customProblem[modelName] || "").trim()
        : selectedProblem[modelName];

    if (!problem) {
      showFlash("error", "Please select or write a problem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/repair/repair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "pending",
          customerData: {
            name: user.name,
            email: user.email,
            phone: user.phone,
          },
          device: {
            company: "iphone",
            series: selectedSeries.series,
            model: modelName,
          },
          problem,
        }),
      });

      // রেসপন্স JSON নাও; HTML এলে graceful fallback
      let data;
      try {
        data = await res.json();
      } catch {
        const txt = await res.text();
        throw new Error(txt || "Server did not return JSON");
      }

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to submit request");
      }

      showFlash("success", data.message);
      // // Reset selection
      // setSelectedSeries(null);
      // setOpenModel(null);
      // setSelectedProblem({});
      // setCustomProblem({});
    } catch (err) {
      console.error(err);
      showFlash("error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-[1400px] relative z-0">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {selectedSeries ? `${selectedSeries.series} Models` : "iPhone Service"}
      </h1>

      {/* Flash message */}
      {flash.text ? (
        <div
          className={`mb-4 rounded-md p-3 text-sm ${
            flash.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {flash.text}
        </div>
      ) : null}

      {/* If no series selected → show series cards */}
      {!selectedSeries && (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6 items-start relative z-50">
          {[...iphoneSeries].reverse().map((seriesObj, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-sm border border-gray-200 
              hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 
              hover:-translate-y-2 transform transition-all duration-300"
            >
              <figure className="px-6 pt-6">
                <img
                  src={seriesObj.models[0].img}
                  alt={seriesObj.series}
                  className="rounded-xl object-contain h-40"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{seriesObj.series}</h2>
                <p className="text-gray-500 text-sm">
                  Click to see available models.
                </p>
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
      )}

      {/* If series selected → show model cards */}
      {selectedSeries && (
        <>
          <button
            className="btn btn-sm btn-outline mb-6"
            onClick={() => {
              setSelectedSeries(null);
              setOpenModel(null);
            }}
          >
            ← Back to Series
          </button>

          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6 items-start">
            {selectedSeries.models.map((model, idx) => (
              <div
                key={idx}
                className="card bg-base-100 shadow-sm border border-gray-200 
                hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 
                hover:-translate-y-2 transform transition-all duration-300"
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
                  <p className="text-gray-500 text-sm">
                    Select your device to see possible issues.
                  </p>

                  <div className="card-actions mt-4">
                    <button
                      className={`btn ${
                        openModel === model.name ? "btn-error" : "btn-primary"
                      }`}
                      onClick={() => toggleDropdown(model.name)}
                    >
                      {openModel === model.name ? "Hide Problems" : "Select Model"}
                    </button>
                  </div>

                  {openModel === model.name && (
                    <div className="mt-4 w-full text-left">
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

                      {/* Selection hint */}
                      {selectedProblem[model.name] &&
                        selectedProblem[model.name] !== "Other" && (
                          <p className="mt-2 text-sm text-green-600 font-medium">
                            Selected: {selectedProblem[model.name]}
                          </p>
                        )}

                      {/* ✅ Submit only when valid */}
                      <button
                        onClick={() => handleSubmit(model.name)}
                        className="btn btn-success w-full mt-4"
                        disabled={loading || !canShowSubmit(model.name)}
                      >
                        {loading ? "Submitting..." : "Submit Request"}
                      </button>
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
