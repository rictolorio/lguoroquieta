import React, { useEffect, useState } from "react";
import { fetchCitations } from "./shared/api";

const CitationList = ({ selectedCitationNo, setSelectedCitationNo }) => {
  const [citations, setCitations] = useState([]);

  useEffect(() => {
    const loadCitations = async () => { 
      try {
        const data = await fetchCitations();
        console.log("API Response:", data); // Debugging
        setCitations(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching citations:", error);
        setCitations([]); // Fallback to empty array
      }
    };
    loadCitations();
  }, []);

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-cyan-500 text-black">
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
              <tr 
                key={c.citation_no} 
                className={`border-b hover:bg-gray-100 transition ${
                  selectedCitationNo === c.citation_no ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedCitationNo(c.citation_no)}
              >
                <td className="p-3 font-semibold">{c.citation_no}</td>
                <td className="p-3">{c.full_name}</td>
                <td className="p-3">{c.date_of_violation || "N/A"}</td>
                <td className="p-3">
                  {Array.isArray(c.violations) && c.violations.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {c.violations.map((v, index) => (
                        typeof v === "object" ? (
                          <li key={index}>
                            {v.or_sec_no} - {v.descriptions}
                          </li>
                        ) : (
                          <li key={index}>{v}</li>
                        )
                      ))}
                    </ul>
                  ) : (
                    "None"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CitationList;
