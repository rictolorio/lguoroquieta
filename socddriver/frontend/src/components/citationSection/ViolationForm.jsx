import React, { useState } from "react";
import { createViolation } from "./shared/api";

const ViolationForm = () => {
  const [violationData, setViolationData] = useState({
    or_sec_no: "",
    descriptions: "",
  });

  const handleChange = (e) => {
    setViolationData({ ...violationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createViolation(violationData);
    alert("Violation added successfully!");
    setViolationData({ or_sec_no: "", descriptions: "" }); // Reset form
  };

  return (
    <div>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Add Violation</h2>
      
            <input
                type="text"
                name="or_sec_no"
                value={violationData.or_sec_no}
                onChange={handleChange}
                placeholder="Ordinance/Section No."
                className="border p-2 w-full"
            />
            
            <input
                type="text"
                name="descriptions"
                value={violationData.descriptions}
                onChange={handleChange}
                placeholder="Violation Description"
                className="border p-2 w-full"
            />

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add Violation
            </button>
            </form>
            </div>
    
  );
};

export default ViolationForm;
