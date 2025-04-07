import React, { useState } from "react";
import CitationForm from "./CitationForm";
import CitationList from "./CitationList";

const CitationMain = () => {
  const [formTitle, setFormTitle] = useState("Add Citation");
  const [refresh, setRefresh] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState(null); // Store selected citation data

  

  // Extend function to update date_of_viola
  const extendCitation = (citation) => {
    setSelectedCitation({
      ...citation,
      // date_of_viola: new Date().toISOString().split("T")[0], // Default to today's date
    });
    setFormTitle("Extend Citation"); // Change title
  };

  return (
    <div className="container mx-auto p-4 bg-darkCyan">
      <div className="flex justify-center bg-black"> 
      {/* Left Side - Citation Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">{formTitle}</h2>
          <CitationForm
            setRefresh={setRefresh} 
            extendCitation={extendCitation} 
            formTitle={formTitle} 
            selectedCitation={selectedCitation} 
          /> 
      </div>

      {/* Right Side - Citation List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Citations List</h2>
          <CitationList 
            refresh={refresh}          
            onExtend={extendCitation}
          />
      </div>
    </div>
    </div>
  );
};

export default CitationMain;
