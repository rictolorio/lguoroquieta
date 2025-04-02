import { useState, useEffect } from "react";
import { fetchViolations, createCitation } from "./shared/api"; // Make sure the path is correct

const CitationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    citation_no: "",
    full_name: "",
    birthday: "",
    age: "",
    gender: "",
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
    violation_ids: [], // To store selected violation IDs
  });

  const [violations, setViolations] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load violations on component mount
  useEffect(() => {
    const loadViolations = async () => {
      try {
        const data = await fetchViolations(); // Assume you have this function
        setViolations(data);
      } catch (error) {
        console.error("Error loading violations:", error);
      }
    };
    loadViolations();
  }, []);

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox change for selecting violations
  const handleViolationChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setFormData((prev) => {
      const violationIds = prev.violation_ids || [];
  
      return {
        ...prev,
        violation_ids: e.target.checked
          ? [...violationIds, id]   // Add if checked
          : violationIds.filter((v) => v !== id), // Remove if unchecked
      };
    });
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!violations || violations.length === 0) {
      setError("No violations available. Please check the violations list.");
      return;
    }

    const citationData = {
      citation_no: formData.citation_no,
      full_name: formData.full_name,
      birthday: formData.birthday,
      age: formData.age,
      gender: formData.gender,
      full_address: formData.full_address,
      driv_lic: formData.driv_lic,
      exp_date: formData.exp_date,
      reg_owner: formData.reg_owner,
      reg_address: formData.reg_address,
      veh_type: formData.veh_type,
      plate_no: formData.plate_no,
      crt_reg_no: formData.crt_reg_no,
      franc_no: formData.franc_no,
      place_of_viola: formData.place_of_viola,
      date_of_viola: formData.date_of_viola,
      time_of_viola: formData.time_of_viola,
      amounts: formData.amounts,
      remarks: formData.remarks,
      app_officer: formData.app_officer,
      violation_ids: formData.violation_ids, // Array of selected violation IDs
    };

    console.log("Citation data being sent:", citationData);  // Log the data to check the payload

    try {
      const response = await createCitation(citationData);
      if (response && response.citation_no) {
        setSuccess("Citation successfully created!");
        onSuccess(); // Refresh citation list
      } else {
        setError(response.detail || "Failed to create citation");
      }
    } catch (error) {
      setError("Error submitting citation.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">Citation No</label>
          <input
            type="text"
            name="citation_no"
            value={formData.citation_no}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Birthday */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Full Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Address</label>
          <input
            type="text"
            name="full_address"
            value={formData.full_address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Driver's License */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Driver's License</label>
          <input
            type="text"
            name="driv_lic"
            value={formData.driv_lic}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Expiration Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Expiration Date</label>
          <input
            type="date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Registered Owner */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Registered Owner</label>
          <input
            type="text"
            name="reg_owner"
            value={formData.reg_owner}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Registered Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Registered Address</label>
          <input
            type="text"
            name="reg_address"
            value={formData.reg_address}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Vehicle Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Vehicle Type</label>
          <input
            type="text"
            name="veh_type"
            value={formData.veh_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Plate No. */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Plate No.</label>
          <input
            type="text"
            name="plate_no"
            value={formData.plate_no}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Certificate of Registration */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Certificate of Registration</label>
          <input
            type="text"
            name="crt_reg_no"
            value={formData.crt_reg_no}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Franchise No. */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Franchise No.</label>
          <input
            type="text"
            name="franc_no"
            value={formData.franc_no}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Place of Violation */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Place Of Violation</label>
          <input
            type="text"
            name="place_of_viola"
            value={formData.place_of_viola}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Date of Violation */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Date of Violation</label>
          <input
            type="date"
            name="date_of_viola"
            value={formData.date_of_viola}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Time of Violation */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Time of Violation</label>
          <input
            type="time"
            name="time_of_viola"
            value={formData.time_of_viola}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Amounts */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Amounts</label>
          <input
            type="text"
            name="amounts"
            value={formData.amounts}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Remarks */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Remarks</label>
          <input
            type="text"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* App Officer */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">App Officer</label>
          <input
            type="text"
            name="app_officer"
            value={formData.app_officer}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Violations */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Violations</label>
          <div className="space-y-2">
            {violations.map((violation) => (
              <label key={violation.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={violation.id}
                  checked={formData.violation_ids.includes((violation.id))}
                  onChange={handleViolationChange}
                />

                <span>{violation.or_sec_no} - {violation.descriptions}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 text-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Save Citation
          </button>
        </div>
      </form>

      {/* Error and Success messages */}
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </div>
  );
};

export default CitationForm;
