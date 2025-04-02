import { useState, useEffect } from "react";
import { fetchViolations, createCitation } from "./shared/api";

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
    violation_ids: [],
  });

  const [violations, setViolations] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadViolations = async () => {
      try {
        const data = await fetchViolations();
        setViolations(data);
      } catch (error) {
        console.error("Error loading violations:", error);
      }
    };
    loadViolations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViolationChange = (e) => {
    const id = parseInt(e.target.value, 10);
    setFormData((prev) => ({
      ...prev,
      violation_ids: e.target.checked
        ? [...prev.violation_ids, id]
        : prev.violation_ids.filter((v) => v !== id),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submitCitation(formData);  // Submit new citation
      console.log("✅ Citation added!");
      
      setRefresh(prev => !prev); // 🔄 Toggle refresh to trigger update
    } catch (error) {
      console.error("❌ Error saving citation:", error);
    }
    
    setError("");
    setSuccess("");

    if (!violations.length) {
      setError("No violations available. Please check the violations list.");
      return;
    }

    try {
      const response = await createCitation(formData);
      if (response?.citation_no) {
        setSuccess("Citation successfully created!");
        setFormData({
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
          violation_ids: [],
        });
        onSuccess();
      } else {
        setError(response.detail || "Failed to create citation");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError("An error occurred while creating the citation.");
    }
  };

  return (
    <div className="h-screen flex flex-col">
       <div className="flex-grow overflow-auto p-4">
       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Citation No</label>
          <input
            type="text"
            name="citation_no"
            value={formData.citation_no}
            onChange={handleChange}
            className="w-full h-10 p-2 border rounded-md resize-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
           className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
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
            className="w-full h-10 p-2 border rounded-md resize-none"
          />
        </div>

       
        {/* Remarks */}
        <div className="w-2/2">
          <label className="block text-gray-700 font-medium">Remarks</label>
          <textarea
            className="w-full h-20 p-2 border rounded-md resize-none"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          />
        </div>

        {/* Violations */}
        <div className="w-2/2">
          <label className="block text-gray-700 font-medium">Violations</label>
          <div className="border p-2 w-full rounded-md h-20 overflow-y-auto space-y-2">
            {violations.map((violation) => (
              <label key={violation.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={violation.id}
                  checked={formData.violation_ids.includes(violation.id)}
                  onChange={handleViolationChange}
                />
                <span>{violation.or_sec_no} - {violation.descriptions}</span>
              </label>
            ))}
          </div>
       
      </div>

        {/* App Officer & Save Button (First Row) */}
      <div className="mb-4 flex gap-2">
        {/* App Officer */}
        <div className="w-3/4">
          <label className="block text-gray-700 font-medium">App Officer</label>
          <input
            type="text"
            name="app_officer"
            value={formData.app_officer}
            onChange={handleChange}
            className="w-full h-10 p-2 border rounded-md"
          />
        </div>

        {/* Save Button */}
        <div className="w-4/4 flex items-end">
          <button type="submit" className="bg-cyan text-white w-full py-2 px-4 rounded">
            Save Citation
          </button>
        </div>
      </div>
      </form>
       </div>
      

      {/* Error and Success messages */}
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </div>
  );
};

export default CitationForm;
