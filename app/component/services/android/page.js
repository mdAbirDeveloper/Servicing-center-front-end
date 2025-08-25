/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Common problems
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
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const [modelsList, setModelsList] = useState([]);
  const [openModel, setOpenModel] = useState(null);

  const [selectedProblem, setSelectedProblem] = useState({});
  const [customProblem, setCustomProblem] = useState({});
  const [loading, setLoading] = useState(false);

  const [flash, setFlash] = useState({ type: "", message: "" });

  const router = useRouter();

  // 🧰 helper: localStorage থেকে user বের করা
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

  // 🔹 Flash message helper
  const showFlash = (type, message) => {
    setFlash({ type, message });
    setTimeout(() => setFlash({ type: "", message: "" }), 15000);
  };

  // 🔹 Fetch companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(
          "https://servicing-center-server.vercel.app/api/v1/company/all-company"
        );
        const data = await res.json();
        setCompanies(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCompanies();
  }, []);

  // 🔹 Handle company select
  const handleCompanySelect = async (company) => {
    setSelectedCompany(company);
    setSelectedSeries(null);
    setModelsList([]);
    try {
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/series/company-name/${company}`
      );
      const data = await res.json();
      setSeriesList(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Handle series select
  const handleSeriesSelect = async (series) => {
    setSelectedSeries(series);
    try {
      const res = await fetch(
        `https://servicing-center-server.vercel.app/api/v1/model/series-name/${series}`
      );
      const data = await res.json();
      setModelsList(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Toggle model problem dropdown
  const toggleDropdown = (modelId) => {
    setOpenModel(openModel === modelId ? null : modelId);
  };

  // 🔹 Submit request per model
  const handleSubmit = async (modelId, modelName) => {
    const user = getCurrentUserFromLocalStorage();
    if (!user || !(user.email || user.phone)) {
      router.push("/component/authentication/login");
      return;
    }

    const problem =
      selectedProblem[modelId] === "Other"
        ? (customProblem[modelId] || "").trim()
        : selectedProblem[modelId];

    if (!problem) {
      showFlash("error", "Please select or write a problem.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        status: "pending", // backend interface অনুযায়ী
        customerData: {
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        device: {
          company: selectedCompany,
          series: selectedSeries,
          model: modelName,
        },
        problem,
      };

      const res = await fetch(
        "https://servicing-center-server.vercel.app/api/v1/repair/repair-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

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

      // Reset selections for that model
      setOpenModel(null);
      setSelectedProblem((prev) => ({ ...prev, [modelId]: "" }));
      setCustomProblem((prev) => ({ ...prev, [modelId]: "" }));
    } catch (err) {
      console.error(err);
      showFlash("error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {selectedCompany ? selectedCompany + " Company " : "Android Service"}
        {selectedSeries && selectedSeries + " Models" }
      </h1>

      {/* 🔹 Flash Message */}
      {flash.message && (
        <div
          className={`mb-4 p-3 rounded text-center font-medium ${
            flash.type === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {flash.message}
        </div>
      )}

      {/* 🔹 Show companies */}
      {!selectedCompany && (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              className="card bg-base-100 shadow-sm border border-gray-200 hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 hover:-translate-y-2 transform transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <img
                  src={company.image.image}
                  alt={company.name}
                  className="h-40 object-contain mb-4"
                />
                <h2 className="card-title">{company.name}</h2>
                <div className="card-actions mt-4">
                  <button
                    className="btn bg-primary text-white"
                    onClick={() => handleCompanySelect(company.name)}
                  >
                    View Series
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Show series */}
      {selectedCompany && !selectedSeries && (
        <>
          <button
            className="btn btn-sm btn-outline mb-6"
            onClick={() => setSelectedCompany(null)}
          >
            ← Back to Brands
          </button>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
            {seriesList.map((series) => (
              <div
                key={series.id}
                className="card bg-base-100 shadow-sm border border-gray-200 hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 hover:-translate-y-2 transform transition-all duration-300"
              >
                <div className="card-body items-center text-center">
                  <img
                  src={series.image.image}
                  alt={series.name}
                  className="h-40 object-contain mb-4"
                />
                  <h2 className="card-title">{series.name}</h2>
                  <div className="card-actions mt-4">
                    <button
                      className="btn bg-primary text-white"
                      onClick={() => handleSeriesSelect(series.name)}
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

      {/* 🔹 Show models */}
      {selectedSeries && (
        <>
          <button
            className="btn btn-sm btn-outline mb-6"
            onClick={() => setSelectedSeries(null)}
          >
            ← Back to Series
          </button>
          <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-6">
            {modelsList.map((model) => (
              <div
                key={model.id}
                className="card bg-base-100 shadow-sm border border-gray-200 hover:shadow-2xl hover:shadow-blue-400 hover:border-blue-400 hover:-translate-y-2 transform transition-all duration-300"
                style={{ alignSelf: "flex-start" }}
              >
                <figure className="px-6 pt-6">
                  <img
                    src={model.image.image}
                    alt={model.name}
                    className="rounded-xl object-contain h-40"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{model.name}</h2>
                  <div className="card-actions mt-4">
                    <button
                      className={`btn ${
                        openModel === model.id ? "btn-error" : " bg-primary text-white"
                      }`}
                      onClick={() => toggleDropdown(model.id)}
                    >
                      {openModel === model.id
                        ? "Hide Problems"
                        : "Select Model"}
                    </button>
                  </div>

                  {openModel === model.id && (
                    <div className="mt-4 w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Select Problem
                      </label>
                      <select
                        className="select select-bordered w-full"
                        value={selectedProblem[model.id] || ""}
                        onChange={(e) =>
                          setSelectedProblem({
                            ...selectedProblem,
                            [model.id]: e.target.value,
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

                      {selectedProblem[model.id] === "Other" && (
                        <textarea
                          className="textarea textarea-bordered w-full mt-3"
                          placeholder="Describe your problem..."
                          value={customProblem[model.id] || ""}
                          onChange={(e) =>
                            setCustomProblem({
                              ...customProblem,
                              [model.id]: e.target.value,
                            })
                          }
                        />
                      )}

                      {selectedProblem[model.id] && (
                        <p className="mt-2 text-sm text-green-600 font-medium">
                          Selected: {selectedProblem[model.id]}
                        </p>
                      )}

                      {/* Submit button per model */}
                      <button
                        className={`btn bg-primary text-white mt-3 ${
                          loading ? "loading" : ""
                        }`}
                        onClick={() => handleSubmit(model.id, model.name)}
                        disabled={loading}
                      >
                        Submit Request
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
