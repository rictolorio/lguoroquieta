import React, { useEffect, useState } from "react";
import { fetchCitations } from "./shared/api";

const CitationList = ({ selectedCitationNo, setSelectedCitationNo, refresh, onExtend }) => {
  const [citations, setCitations] = useState([]);
  const [error, setError] = useState(null);

  // 🔄 Fetch citations when component mounts or `refresh` changes
  useEffect(() => {
    const loadCitations = async () => {
      setCitations([]); // Clear old data before fetching
      setError(null); // Reset error state

      try {
        const data = await fetchCitations();
        setCitations(data);
      } catch (err) {
        setError("Error fetching citations. Please try again.");
      }
    };
    

    loadCitations();
  }, [refresh]);

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
            <th className="p-3 text-left">Actions</th>
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
                <tr key={c.citation_no} className="border-b">
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

                  {/* Extend Button */}     
                  <td className="p-3 flex gap-2">
                  <button 
                    onClick={() => onExtend(c)} 
                    className="bg-cyan text-white px-4 py-2 rounded">
                    Extend
                  </button>

                     {/* Future Reduce Button */}
                    <button
                      className="bg-green text-white px-3 py-1 rounded hover:bg-green-600"
                      disabled
                    >
                      Reduce (Future)
                    </button>
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
