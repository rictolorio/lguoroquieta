import React, { useEffect, useState } from "react";
import { fetchCitations } from "./shared/api";

const CitationList = ({ selectedCitationNo, setSelectedCitationNo, refresh }) => {
  const [citations, setCitations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 Refresh Triggered:", refresh);

    const loadCitations = async () => {
      setCitations([]); // Clear old citations before fetching new ones
      setError(null); // Reset error state

      try {
        console.log("⏳ Fetching citations...");
        const data = await fetchCitations(`?timestamp=${new Date().getTime()}`);
        setCitations(data);
        console.log("✅ Citations loaded:", data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Error fetching citations. Please try again.");
      }
    };

    loadCitations(); // Fetch citations on mount & refresh update
  }, [refresh]); // Dependency ensures re-fetching when `refresh` changes // Dependency ensures re-fetching when `refresh` changes

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-cyan text-white">
          <tr>
            <th className="p-3 text-left">Citation No</th>
            <th className="p-3 text-left">Full Name</th>
            <th className="p-3 text-left">Date of Violation</th>
            <th className="p-3 text-left">Violations</th>
          </tr>
        </thead>
        <tbody>
          {citations.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No citations available.
              </td>
            </tr>
          ) : (
            citations.map((c) => (
              <React.Fragment key={c.citation_no}>
                <tr 
                  onClick={() => setSelectedCitationNo(c.citation_no)}
                  className="cursor-pointer hover:bg-gray-100 transition"
                >
                  <td className="p-3">{c.citation_no}</td>
                  <td className="p-3">{c.full_name}</td>
                  <td className="p-3">{c.date_of_viola}</td>
                  <td className="p-3">
                    {c.violations?.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {c.violations.map((v, index) => (
                          <li key={index}>{v.or_sec_no} - {v.descriptions}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">No violations</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" className="py-2">
                    <hr className="border-gray-300" />
                  </td>
                </tr>
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitationList;
