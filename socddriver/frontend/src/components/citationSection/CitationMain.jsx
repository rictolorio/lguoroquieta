import React from "react";
import CitationForm from "./CitationForm";
import CitationList from "./CitationList";

const CitationMain = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 h-screen">
      {/* Left Side - Citation Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Add Citation</h2>
        <CitationForm />
      </div>

      {/* Right Side - Citation List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Citations List</h2>
        <CitationList />
      </div>
    </div>
  );
};

export default CitationMain;
