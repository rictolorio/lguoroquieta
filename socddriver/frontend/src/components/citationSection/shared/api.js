// api.js
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

// Fetch all citations
export const fetchCitations = async () => {
  try {
    const res = await fetch(`${API_URL}/citations/`);
    if (!res.ok) {
      throw new Error("Failed to fetch citations");
    }
    const data = await res.json(); // Correct this line
    console.log("Fetched data:", data); // Log the fetched data
    return data;
  } catch (error) {
    console.error("Error fetching citations:", error);
    throw error; // Rethrow the error to handle it in the component
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
    throw error;
  }
};

// Create a citation (including violations)
export const createCitation = async (citationData) => {
  try {
    const response = await axios.post(`${API_URL}/citations/`, citationData); // Fix the endpoint if necessary
    return response.data;
  } catch (error) {
    console.error("Error creating citation:", error);
    throw error;
  }
};
