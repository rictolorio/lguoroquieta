import React, { useState, useEffect } from "react";
import { fetchViolations, createCitation, updateCitation } from "./shared/api";


const initialFormState = {citation_no: "", full_name: "", birthday: "", age: "", gender: "", full_address: "", driv_lic:  
                          "", exp_date: "", reg_owner: "", reg_address: "", veh_type: "", plate_no: "", crt_reg_no: "", franc_no: "", place_of_viola: "", date_of_viola: "", time_of_viola: "", amounts: "", remarks: "", app_officer: "", violation_ids: [],
};

// Function to reset the form
const resetForm = () => {
  return { ...initialFormState }; // Return a fresh copy
};

const CitationForm = ({ onSuccess, setRefresh, selectedCitation }) => {
  const [formData, setFormData] = useState(resetForm());
  const [violations, setViolations] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isExtendMode, setIsExtendMode] = useState(false);
  
  
  useEffect(() =>{
    const loadViolations = async () => {
      try {
        const data = await fetchViolations();
        setViolations(data);
      } catch (error) {
        console.error("Error loading violations:", error);
        setError("Failed to load violations");
      }
    };
    loadViolations();
  }, [])
  
  useEffect(() => {
    if (selectedCitation && selectedCitation.citation_no) {
      console.log("Selected Citation:", selectedCitation);
      setFormData({
        ...selectedCitation,  // Spread existing citation data to populate form
        violation_ids: selectedCitation.violations.map((v) => v.id),
         // Don't overwrite date_of_viola if it's already set
        // date_of_viola: selectedCitation.date_of_viola || formData.date_of_viola || "",  // Default to current date if not set       
      });
      setIsExtendMode(true); // Set extend mode if a citation is selected
    } else {
      setFormData(resetForm()); // Reset when there's no selected citation
      setIsExtendMode(false); // Disable extend mode
    }      
  }, [selectedCitation]);

  const handleChange = (e) => {
    const { name, value } = e.target;

     // Capitalize first letter of each word
     const formattedValue = value
     .toLowerCase() // Convert all text to lowercase first
     .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleViolationChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const { checked } = e.target;

    setFormData((prev) => {
     const updatedViolations = checked    
        ? [...prev.violation_ids, id]
        : prev.violation_ids.filter((v) => v !== id)
      return { ...prev, violation_ids: updatedViolations };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Citation Data:", formData); // Debugging
  
    // try {
    //   // If extending, don't change the existing date_of_viola
    //   if (!formData.date_of_viola && !isExtendMode) {
    //     // If it's a new record and date_of_viola isn't set, set it to current date
    //     setFormData((prev) => ({
    //       ...prev,
    //       date_of_viola: new Date().toISOString().split("T")[0],  // Set current date (YYYY-MM-DD)
    //     }));
    //   }
  
    //   // Convert date_of_viola to ISO format
    // } catch (error) {
    //   console.error("Error setting date_of_viola:", error);
    // }

    try {
      if (!formData.violation_ids.length) {
        setError("No violations selected. Please select at least one violation.");
        return;
      }
  
      let response;
  
      if (selectedCitation && selectedCitation.id) {
        // Update existing citation
        console.log(`🟠 Updating citation ID: ${selectedCitation.id}`);
        console.log("🟡 Sending updated violation_ids:", formData.violation_ids);
        response = await updateCitation(selectedCitation.id, {
          ...formData, 
          violation_ids: formData.violation_ids 
        });
      } else {
        // Create new citation
        response = await createCitation(formData);
      }
  
      if (response?.citation_no) {
        setSuccess(selectedCitation ? "Citation successfully updated!" : "Citation successfully created!");
  
        // Reset form on success
        setFormData(resetForm()); 
  
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setError(response.detail || "Failed to submit citation");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setError(error.message || "An error occurred while submitting the citation.");
    }
  };
  
  const getInputProps = (fieldName) => {
    // Allow these fields to remain editable
    const editableFields = ["date_of_viola", "violation_ids"];
  
    return {
      name: fieldName,
      value: formData[fieldName] || "",
      onChange: handleChange,
      disabled: isExtendMode && !editableFields.includes(fieldName), // Disable all except `date_of_viola` and `violation_ids`
      className: "w-full h-10 p-2 border rounded-md",
    };
  };
  

  return (
    // <div className="max-w-3xl max-h-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col h-screen p-4 space-y-4 overflow-auto ">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-grow">
         
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
              disabled={isExtendMode}
            />
          </div>

          {/* Personal Information Group */}
          <div className="col-span-2">
            <h2 className="font-medium text-lg mb-2">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Full Name</label>
                <input {...getInputProps("full_name")} 
                />
              </div>
              
               {/* Full Address */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Full Address</label>
                <input {...getInputProps("full_address")}
                />

               {/* Gender */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Gender</label>
                <select {...getInputProps("gender")} className="w-full h-10 p-2 border rounded-md resize-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

               {/* Age */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Age</label>
                <input {...getInputProps("age")}
                />
              </div>              
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Birthday</label>
                <input {...getInputProps("birthday")} type="date" />
              </div>          

               {/* Driver's License */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Driver's License</label>
                <input {...getInputProps("driv_lic")} />

              </div>

               {/* Expiration Date */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Expiration Date</label>
                <input {...getInputProps("exp_date")} type="date" />
              </div>
            </div>
          </div>
        </div>

          {/* Vehicle Information Group */}
          <div className="col-span-2">
            <h2 className="text-lg mb-2 font-medium">Vehicle Information</h2>
            <div className="grid grid-cols-2 gap-4">

               {/* Registered Owner */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Registered Owner</label>
                <input {...getInputProps("reg_owner")} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Registered Address</label>
                  <input {...getInputProps("reg_address")} />
              </div>

              {/* Vehicle Type */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Vehicle Type</label>
                <input {...getInputProps("veh_type")} />
              </div>

              {/* Plate No. */}   
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Plate No.</label>
                <input {...getInputProps("plate_no")} />
              </div>

               {/* Certificate of Registration */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Certificate of Registration</label>
                <input {...getInputProps("crt_reg_no")} />
              </div>

               {/* Franchise No. */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Franchise No.</label>
                <input {...getInputProps("franc_no")} />
              </div>

               {/* Place of Violation */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Place Of Violation</label>
                <input {...getInputProps("place_of_viola")} />
              </div>

                {/* Date of Violation */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Date of Violation</label>
                <input
                  type="date"
                  name="date_of_viola"
                  value={formData.date_of_viola || ""}
                  onChange={handleChange}
                  className="w-full h-10 p-2 border rounded-md resize-none"
                />
              </div>

              {/* Time of Violation */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Time of Violation</label>
                <input {...getInputProps("time_of_viola")} type="time" />
              </div>

               {/* Amounts */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Amounts</label>
                <input {...getInputProps("amounts")}  type="number"  step="0.01" min="0"/>               
              </div>            
                
              {/* Violation Selection */}
              <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Violations</label>
                          <div className="mb-4 max-h-48 overflow-y-auto border rounded-md p-2">
                          {violations.length > 0 ? (
                            violations.map((violation) => (
                              <label key={violation.id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  value={violation.id}
                                  checked={formData.violation_ids.includes(violation.id)}
                                  onChange={handleViolationChange}
                                  disabled={false} // Always enabled
                                  className="mr-2"
                                />
                                <span>{violation.or_sec_no} - {violation.descriptions}</span>
                              </label>
                            ))
                          ) : (
                            <p>No violations available.</p>
                          )}
                         
                        </div>
                      </div>

              {/* Remarks  */}
              <div className="mb-4">
                <div className="mb-4 w-full">
                  <label className="block text-gray-700 font-medium">Remarks</label>
                  <textArea {...getInputProps("remarks")} className="w-full h-20 p-2 border rounded-md" />
                </div> 

              {/* Apprehending Officer */}
              <div className="w-full mb-4">
                <label className="block text-gray-700 font-medium">App Officer</label>
                <input {...getInputProps("app_officer")} />
              </div>   
            </div>
          </div>
          
           {/* Action Buttons */}
           <div className="w-full h-30">
           <button 
           type="submit"
           className="w-full bg-cyan text-white px-4 py-2 rounded"
           disabled={isExtendMode && !formData.violation_ids.length}
           >
            {isExtendMode  ? "Extend Citation" : "Save Citation"}
            </button>
          </div>
         </div> 
        </form>

           {/* Error and Success Messages */}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {success && <div className="text-green-500 text-center">{success}</div>}
      </div>     
    // </div>
  );
};

export default CitationForm;
