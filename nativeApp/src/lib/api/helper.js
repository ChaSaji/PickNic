import { API_URL } from "@env";

export const fetchAPI = async ({
  endpoint,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
  },
  body = null,
}) => {
  const options = { method, headers };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
