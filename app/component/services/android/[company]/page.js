/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function AndroidModelPage({ params }) {
  const { company } = params;
  const router = useRouter();

  const [seriesList, setSeriesList] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [modelsList, setModelsList] = useState([]);
  const [openModel, setOpenModel] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState({});
  const [customProblem, setCustomProblem] = useState({});
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState({ type: "", message: "" });

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

  const showFlash = (type, message) => {
    setFlash({ type, message });
    setTimeout(() => setFlash({ type: "", message: "" }), 15000);
  };

  useEffect(() => {
    const fetchSeries = async () => {
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
    fetchSeries();
  }, [company]);

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

  const toggleDropdown = (modelId) => setOpenModel(openModel === modelId ? null : modelId);

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
        status: "pending",
        customerData: user,
        device: {
          company,
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

      const data = await res.json();
      if (!res.ok || data.success === false) throw new Error(data.message || "Failed");
      showFlash("success", data.message);
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

    if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium">
 
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 max-w-[1400px] min-h-screen">
      <button className="btn btn-sm mb-4" onClick={() => router.back()}>
        ← Back to Companies
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">
        {company} {selectedSeries ? " / " + selectedSeries : ""}
      </h1>

      {flash.message && (
        <div
          className={`mb-4 p-3 rounded text-center font-medium ${
            flash.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {flash.message}
        </div>
      )}

      {!selectedSeries && (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
          {seriesList.map((series) => (
            <div
              key={series.id}
              className="card shadow-sm border border-gray-200 hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2"
            >
              <div className="card-body text-center">
                <img src={series.image.image} alt={series.name} className="h-40 object-contain mb-4" />
                <h2 className="card-title">{series.name}</h2>
                <button className="btn bg-primary text-white mt-4" onClick={() => handleSeriesSelect(series.name)}>
                  View_Models
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSeries && (
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
          {modelsList.map((model) => (
            <div key={model.id} className="card shadow-sm border border-gray-200 hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2">
              <figure className="px-6 pt-6">
                <img src={model.image.image} alt={model.name} className="rounded-xl object-contain h-40" />
              </figure>
              <div className="card-body text-center">
                <h2 className="card-title">{model.name}</h2>
                <button
                  className={`btn ${openModel === model.id ? "btn-error" : "bg-primary text-white"} mt-4`}
                  onClick={() => toggleDropdown(model.id)}
                >
                  {openModel === model.id ? "Hide_Problems" : "Select_Model"}
                </button>

                {openModel === model.id && (
                  <div className="mt-4 w-full text-left">
                    <select
                      className="select bg-white select-bordered w-full"
                      value={selectedProblem[model.id] || ""}
                      onChange={(e) =>
                        setSelectedProblem({ ...selectedProblem, [model.id]: e.target.value })
                      }
                    >
                      <option value="" disabled>-- Choose a problem --</option>
                      {commonProblems.map((p, i) => (
                        <option key={i} value={p}>{p}</option>
                      ))}
                    </select>

                    {selectedProblem[model.id] === "Other" && (
                      <textarea
                        className="textarea bg-white textarea-bordered w-full mt-3"
                        placeholder="Describe your problem..."
                        value={customProblem[model.id] || ""}
                        onChange={(e) =>
                          setCustomProblem({ ...customProblem, [model.id]: e.target.value })
                        }
                      />
                    )}

                    <button
                      className={`p-2 rounded-2xl bg-primary text-white mt-3 ${loading ? "loading" : ""}`}
                      onClick={() => handleSubmit(model.id, model.name)}
                      disabled={loading}
                    >
                      Submit_Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
