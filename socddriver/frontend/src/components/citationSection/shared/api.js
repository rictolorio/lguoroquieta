// api.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// Fetch all citations
export const fetchCitations = async () => {
  try {
    const res = await fetch(`${API_URL}/citations/`);
    if (!res.ok) {
      throw new Error(`Failed to fetch citations: ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Fetched Citations:", data); // Log fetched data for debugging
    return data;
  } catch (error) {
    console.error("Error fetching citations:", error.message);
    throw error;
  }
};

// Fetch all violations
export const fetchViolations = async () => {
  try {
    const res = await fetch(`${API_URL}/violations/`);
    if (!res.ok) {
      throw new Error(`Failed to fetch violations: ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Fetched Violations:", data);
    return data;
  } catch (error) {
    console.error("Error fetching violations:", error.message);
    throw error;
  }
};

// Create a citation (including violations)
export const createCitation = async (citationData) => {
  try {
    const response = await axios.post(`${API_URL}/citations/`, citationData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with an error status
      console.error("Server Error (Response Data):", error.response.data);
      console.error("Status Code:", error.response.status);
      throw new Error(`Server Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No Response Received:", error.request);
      throw new Error("No response from the server. Check your API.");
    } else {
      // Something else happened
      console.error("Request Setup Error:", error.message);
      throw new Error(`Request Setup Error: ${error.message}`);
    }
  }
};

// Update an existing citation (extend)
export const updateCitation = async (id, formData) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/citations/${id}/`, {  // Use ID
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status} - ${JSON.stringify(data)}`);
    }
    return data;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

