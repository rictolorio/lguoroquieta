const API_URL = "http://127.0.0.1:8000";

// Fetch all citations
export const fetchCitations = async () => {
  try {
    const res = await fetch(`${API_URL}/citations/`);
    if (!res.ok) {
      throw new Error("Failed to fetch citations");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching citations:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

// Fetch all violations
export const fetchViolations = async () => {
  try {
    const res = await fetch(`${API_URL}/violations/`);
    if (!res.ok) {
      throw new Error("Failed to fetch violations");
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching violations:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

// Create a citation (including violations)
export const createCitation = async (data) => {
  const formattedData = {
    citation_no: data.citation_no,
    full_name: data.full_name,
    violation_ids: data.violations.map((v) => v.id), // Send only IDs
  };

  const res = await fetch(`${API_URL}/citations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formattedData),
  });

  const result = await res.json().catch(() => res.text()); // Handle non-JSON errors
  console.log("API Response:", result); // Log the full response

  return result;
};




