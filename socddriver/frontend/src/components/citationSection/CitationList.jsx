import React, { useEffect, useState } from "react";
import { fetchCitations } from "./shared/api";

const CitationList = ({ selectedCitationNo, setSelectedCitationNo, refresh }) => {
  const [citations, setCitations] = useState([]);
  const [error, setError] = useState(null); 

  // Function to load citations from API
  const loadCitations = async () => {
    try {
      const data = await fetchCitations();
      setCitations(data);
    } catch (error) {
      setError("Error fetching citations. Please try again.");
    }
  };

  useEffect(() => {
    loadCitations(); // Fetch citations on component mount
  }, [refresh]); // Runs again when `refresh` changes

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
                <tr onClick={() => setSelectedCitationNo(c.citation_no)}>
                  <td>{c.citation_no}</td>
                  <td>{c.full_name}</td>
                  <td>{c.date_of_viola}</td>
                  <td>
                    {c.violations?.length > 0 ? (
                      <ul>
                        {c.violations.map((v, index) => (
                          <li key={index}>{v.or_sec_no} - {v.descriptions}</li>
                        ))}
                      </ul>
                    ) : "No violations"}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <hr style={{ border: "1px solid #ccc", margin: "10px 0" }} />
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
