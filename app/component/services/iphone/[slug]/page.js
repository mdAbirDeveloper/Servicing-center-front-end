"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const iphoneSeriesData = {
  "5": [
    { name: "iPhone 5", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-5-ofic.jpg" },
    { name: "iPhone 5s", img: "https://londonmagicstore.co.uk/cdn/shop/products/03f50586-4449-448b-8802-a1ff11bde599_800x.jpg?v=1624448208" },
    { name: "iPhone SE (1st Gen)", img: "https://fonezone.me/cdn/shop/products/ses_3e182887-2761-4a91-8ccc-af32291fefc0.jpg?v=1719926848&width=416" },
  ],
  "6": [
    { name: "iPhone 6", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111940_SP705-iphone_6-mul.png" },
    { name: "iPhone 6 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-6-plus.jpg" },
    { name: "iPhone 6s", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-6s.jpg" },
    { name: "iPhone 6s Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-6s-plus.jpg" },
  ],
  "7": [
    { name: "iPhone 7", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111943_iphone7-rosegold.png" },
    { name: "iPhone 7 Plus", img: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111943_iphone7-plus-rosegold.png" },
  ],
  "8": [
    { name: "iPhone 8", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-8.jpg" },
    { name: "iPhone 8 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-8-plus.jpg" },
  ],
  "x": [
    { name: "iPhone X", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg" },
    { name: "iPhone XR", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xr-new.jpg" },
    { name: "iPhone XS", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs.jpg" },
    { name: "iPhone XS Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-xs-max.jpg" },
  ],
  "11": [
    { name: "iPhone 11", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg" },
    { name: "iPhone 11 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg" },
    { name: "iPhone 11 Pro Max", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBPDnyA8O0zjuS7_qYJkiZNL-0m5nUqWPtYQ&s" },
    { name: "iPhone SE (2nd Gen)", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-se-2020.jpg" },
  ],
  "12": [
    { name: "iPhone 12", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg" },
    { name: "iPhone 12 Mini", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-mini.jpg" },
    { name: "iPhone 12 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro.jpg" },
    { name: "iPhone 12 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro-max.jpg" },
  ],
  "13": [
    { name: "iPhone 13", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg" },
    { name: "iPhone 13 Mini", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg" },
    { name: "iPhone 13 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg" },
    { name: "iPhone 13 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg" },
  ],
  "14": [
    { name: "iPhone 14", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg" },
    { name: "iPhone 14 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-plus.jpg" },
    { name: "iPhone 14 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg" },
    { name: "iPhone 14 Pro Max", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxgRh_y06335yEg1a1FRgJI_AJNIDCAYxSZA&s" },
  ],
  "15": [
    { name: "iPhone 15", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg" },
    { name: "iPhone 15 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-plus-.jpg" },
    { name: "iPhone 15 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg" },
    { name: "iPhone 15 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg" },
  ],
  "16": [
    { name: "iPhone 16", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg" },
    { name: "iPhone 16 Plus", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg" },
    { name: "iPhone 16 Pro", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg" },
    { name: "iPhone 16 Pro Max", img: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg" },
  ],
};


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

function getCurrentUserFromLocalStorage() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const data = JSON.parse(raw);
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

export default function IPhoneModelPage({ params }) {
  const { slug } = params;
  const models = iphoneSeriesData[slug] || [];
  const router = useRouter();

  const [openModel, setOpenModel] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [customProblem, setCustomProblem] = useState({});
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState({ type: "", text: "" });

  const toggleDropdown = (model) => setOpenModel(openModel === model ? null : model);

  const canShowSubmit = (modelName) => {
    const chosen = selectedProblem[modelName];
    const custom = customProblem[modelName];
    if (chosen === "Other") return (custom || "").trim().length > 0;
    return !!chosen;
  };

  const showFlash = (type, text) => {
    setFlash({ type, text });
    setTimeout(() => setFlash({ type: "", text: "" }), 30000);
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
      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/repair/repair-request",
        {
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
              series: slug,
              model: modelName,
            },
            problem,
          }),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch {
        const txt = await res.text();
        throw new Error(txt || "Server did not return JSON");
      }

      if (!res.ok || data.success === false) throw new Error(data.message || "Failed to submit request");
      showFlash("success", data.message);
    } catch (err) {
      console.error(err);
      showFlash("error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-[1400px]">
      <button className="btn btn-sm mb-4" onClick={() => router.back()}>
        ← Back to Series
      </button>
      {flash.text && (
        <div
          className={`mb-4 rounded-md p-3 text-sm ${
            flash.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {flash.text}
        </div>
      )}
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
        {models.map((model, idx) => (
          <div
            key={idx}
            className="card shadow-sm border border-gray-200 hover:shadow-2xl hover:border-blue-400 transform transition-all duration-300 hover:-translate-y-2"
          >
            <figure className="px-6 pt-6">
              <img src={model.img} alt={model.name} className="rounded-xl object-contain h-40" />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title">{model.name}</h2>
              <button
                className={`btn ${openModel === model.name ? "btn-error" : "bg-primary text-white"} mt-4`}
                onClick={() => toggleDropdown(model.name)}
              >
                {openModel === model.name ? "Hide Problems" : "Select Model"}
              </button>

              {openModel === model.name && (
                <div className="mt-4 w-full text-left">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Select Problem</label>
                  <select
                    className="select bg-white select-bordered w-full"
                    value={selectedProblem[model.name] || ""}
                    onChange={(e) =>
                      setSelectedProblem({ ...selectedProblem, [model.name]: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      -- Choose a problem --
                    </option>
                    {commonProblems.map((problem, i) => (
                      <option key={i} value={problem}>
                        {problem}
                      </option>
                    ))}
                  </select>

                  {selectedProblem[model.name] === "Other" && (
                    <textarea
                      className="textarea bg-white textarea-bordered w-full mt-3"
                      placeholder="Describe your problem..."
                      value={customProblem[model.name] || ""}
                      onChange={(e) =>
                        setCustomProblem({ ...customProblem, [model.name]: e.target.value })
                      }
                    />
                  )}

                  {selectedProblem[model.name] && selectedProblem[model.name] !== "Other" && (
                    <p className="mt-2 text-sm text-green-600 font-medium">
                      Selected: {selectedProblem[model.name]}
                    </p>
                  )}

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
    </div>
  );
}
