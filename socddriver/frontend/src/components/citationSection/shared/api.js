import axios from 'axios';
const API_URL = "http://127.0.0.1:8000";

export const fetchCitations = async () => {
  const res = await fetch(`${API_URL}/citations/`);
  return res.json();
};

export const fetchViolations = async () => {
  const res = await fetch(`${API_URL}/violations/`);
  return res.json();
};

export const createCitation = async (data) => {
  const res = await fetch(`${API_URL}/citations/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("API Response:", result); // Debugging output
  return result;
};

