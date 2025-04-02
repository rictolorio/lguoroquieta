import React, { useState } from "react";
import CitationForm from "./CitationForm";
import CitationList from "./CitationList";

const CitationMain = () => {
  const [refresh, setRefresh] = useState(0); // State to trigger refresh

  return (
    <div className="grid grid-cols-2 gap-6 p-6 h-screen">
      {/* Left Side - Citation Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Citation</h2>
        <CitationForm setRefresh={setRefresh} /> {/* Pass setRefresh to form */}
      </div>

      {/* Right Side - Citation List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Citations List</h2>
        <CitationList refresh={refresh} /> {/* Pass refresh state to list */}
      </div>
    </div>
  );
};

export default CitationMain;
