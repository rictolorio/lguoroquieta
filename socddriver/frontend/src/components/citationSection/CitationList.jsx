// CitationList.jsx
import React, { useEffect, useState } from "react";
import { fetchCitations } from "./shared/api";

const CitationList = ({ selectedCitationNo, setSelectedCitationNo }) => {
  const [citations, setCitations] = useState([]);
  const [error, setError] = useState(null); // To hold the error state

  useEffect(() => {
    const loadCitations = async () => { 
      try {
        const data = await fetchCitations();
        console.log("API Response:", data); // Debugging
        setCitations(data); // Update citations with the fetched data
      } catch (error) {
        console.error("Error fetching citations:", error);
        setError("Error fetching citations. Please try again."); // Set error message
      }
    };
    loadCitations();
  }, []);

  // Handle citation selection
  const handleSelectCitation = (citationNo) => {
    setSelectedCitationNo(citationNo); // Update the parent state with selected citation number
  };

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error */}
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
              <tr key={c.citation_no}>
                <td>{c.citation_no}</td>
                <td>{c.full_name}</td>
                <td>{c.date_of_viola}</td>
                <td>
                  {Array.isArray(c.violations) && c.violations.length > 0 ? (
                    <ul>
                      {c.violations.map((v, index) => (
                        <li key={index}>
                          {v.or_sec_no} - {v.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No violations"
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
