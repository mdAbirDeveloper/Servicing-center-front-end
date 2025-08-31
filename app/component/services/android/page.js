/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AndroidSeriesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showAll, setShowAll] = useState(false); // 🔹 নতুন state
  const router = useRouter();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://servicing-center-server.vercel.app/api/v1/company/all-company"
        );
        const data = await res.json();
        setCompanies(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 text-lg font-medium"></p>
        </div>
      </div>
    );
  }

  // 🔹 যদি showAll false হয়, তাহলে শুধু প্রথম 6টা দেখাবে
  const displayedCompanies = showAll ? companies : companies.slice(0, 6);

  return (
    <div className="mx-auto p-4 max-w-[1400px]">
      <h1 className="text-3xl font-bold mb-8 text-center">Android Services</h1>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
        {displayedCompanies.map((company) => (
          <div
            key={company.id}
            className="card shadow-sm border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-2"
          >
            <div className="card-body text-center">
              <img
                src={company.image.image}
                alt={company.name}
                className="h-40 object-contain mb-4"
              />
              <h2 className="card-title">{company.name}</h2>
              <button
                className="btn bg-primary text-white mt-4"
                onClick={() =>
                  router.push(`/component/services/android/${company.name}`)
                }
              >
                View_Series
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Show All Button */}
      {companies.length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            className="btn bg-blue-600 text-white hover:bg-blue-700 transition-all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      )}
    </div>
  );
}
