import { useState, useEffect } from "react";
import { fetchViolations, createCitation } from "./shared/api";

const CitationForm = ({ onSuccess, setRefresh, selectedCitation }) => {
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
  const [isExtending, setIsExtending] = useState(false);

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

    if (selectedCitation) {
      setFormData({
        ...selectedCitation,
        violation_ids: selectedCitation.violations?.map((v) => v.id) || [],
      });
      setIsExtending(true);
    } else {
      setIsExtending(false);
    }
  }, [selectedCitation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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
      if (!violations.length) {
        setError("No violations available. Please check the violations list.");
        return;
      }
      
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
          {/* Citation No */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Citation No</label>
            <input
              type="text"
              name="citation_no"
              value={formData.citation_no}
              onChange={handleChange}
              className="w-full h-10 p-2 border rounded-md"
              required
            />
          </div>

          {/* Personal Information Group */}
          <div className="col-span-2">
            <h2 className="font-medium text-lg mb-2">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full h-10 p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full h-10 p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information Group */}
          <div className="col-span-2">
            <h2 className="font-medium text-lg mb-2">Vehicle Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">Vehicle Type</label>
                <input
                  type="text"
                  name="veh_type"
                  value={formData.veh_type}
                  onChange={handleChange}
                  className="w-full h-10 p-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Plate No.</label>
                <input
                  type="text"
                  name="plate_no"
                  value={formData.plate_no}
                  onChange={handleChange}
                  className="w-full h-10 p-2 border rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Violation Selection */}
          <div className="w-full">
            <label className="block text-gray-700">Violations</label>
            <div className="border p-2 rounded-md h-20 overflow-y-auto space-y-2">
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

          {/* Remarks & Officer */}
          <div className="w-full flex gap-4">
            <div className="mb-4 w-full">
              <label className="block text-gray-700">Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full h-20 p-2 border rounded-md"
              />
            </div>
            <div className="w-full mb-4">
              <label className="block text-gray-700">App Officer</label>
              <input
                type="text"
                name="app_officer"
                value={formData.app_officer}
                onChange={handleChange}
                className="w-full h-10 p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button type="submit" className="bg-cyan text-white w-full py-2 rounded">
              {isExtending ? "Extend Citation" : "Save Citation"}
            </button>
          </div>
        </form>
      </div>

      {/* Error and Success Messages */}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {success && <div className="text-green-500 text-center">{success}</div>}
    </div>
  );
};

export default CitationForm;
