import React, { useState, useEffect } from "react";
import { createCitation, fetchViolations } from "./shared/api";

const CitationForm = () => {
  const [citationData, setCitationData] = useState({
    citation_no: "",
    full_name: "",
    birthday: "",
    gender: "",
    age: "",
    full_address: "",
    driv_lic: "",
    exp_date: "",
    reg_owner: "",
    reg_address: "",
    veh_type: "",
    plate_no: "",
    crt_reg_no: "",
    franc_no: "",
    place_of_viola: "",
    date_of_viola: "",
    time_of_viola: "",
    amounts: "",
    remarks: "",
    app_officer: "",
    violations: []
  });

  const [violations, setViolations] = useState([]);

  useEffect(() => {
    const loadViolations = async () => {
      const data = await fetchViolations();
      setViolations(data);
    };
    loadViolations();
  }, []);

  const handleChange = (e) => {
    setCitationData({ ...citationData, [e.target.name]: e.target.value });
  };

  const handleViolationChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setCitationData((prev) => ({
      ...prev,
      violations: prev.violations.includes(selectedId)
        ? prev.violations.filter((id) => id !== selectedId)
        : [...prev.violations, selectedId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCitation(citationData);
    alert("Citation saved successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        
        {/* Citation No. */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Citation No</label>
          <input
            type="text"
            name="citation_no"
            value={citationData.citation_no}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={citationData.full_name || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={citationData.birthday || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="gender"
            value={citationData.gender || ""}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={citationData.age || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Address</label>
          <input
            type="text"
            name="full_address"
            value={citationData.full_address || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Driver's License</label>
          <input
            type="text"
            name="driv_lic"
            value={citationData.driv_lic || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Expiration Date</label>
          <input
            type="date"
            name="exp_date"
            value={citationData.exp_date || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Registered Owner</label>
          <input
            type="text"
            name="reg_owner"
            value={citationData.reg_owner || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Registered Address</label>
          <input
            type="text"
            name="reg_address"
            value={citationData.reg_address || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Vehicle Type</label>
          <input
            type="text"
            name="veh_type"
            value={citationData.veh_type || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Plate No.</label>
          <input
            type="text"
            name="plate_no"
            value={citationData.plate_no || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Certificate of Registration</label>
          <input
            type="text"
            name="crt_reg_no"
            value={citationData.crt_reg_no || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Franchise No.</label>
          <input
            type="text"
            name="franc_no"
            value={citationData.franc_no || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Place of Violation</label>
          <input
            type="text"
            name="place_of_viola"
            value={citationData.place_of_viola || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Date of Violation</label>
          <input
            type="date"
            name="date_of_viola"
            value={citationData.date_of_viola || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Time of Violation</label>
          <input
            type="time"
            name="time_of_viola"
            value={citationData.time_of_viola || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Amounts</label>
          <input
            type="number"
            name="amounts"
            value={citationData.amounts || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Remarks</label>
          <textarea
            name="remarks"
            value={citationData.remarks || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md h-32 resize-y"
            placeholder="Enter remarks here..."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">App Officer</label>
          <input
            type="text"
            name="app_officer"
            value={citationData.app_officer || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        
        {/* Select Violations */}
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700 font-medium">Select Violations</label>
          <div className="border border-gray-300 rounded-md p-2 h-40 overflow-y-scroll">
            {violations.map((violation) => (
              <div key={violation.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={violation.id}
                  checked={citationData.violations.includes(violation.id)}
                  onChange={handleViolationChange}
                  className="mr-2"
                />
                <span>{violation.or_sec_no} - {violation.descriptions}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2">
          <button type="submit" className="w-full bg-cyan text-white p-2 rounded-md hover:bg-orange">
            Save Citation
          </button>
        </div>
      </form>
    </div>
  );
};

export default CitationForm;
