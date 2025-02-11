const backEndBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const apiRequest = async (endpoint:string, data:any, extraHeaders = {}, method = "GET") => {
  try {

    console.log("data", data,backEndBaseUrl)


    const token = localStorage.getItem("authToken");

    const headers = {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Attach token if available
      ...extraHeaders, // Allow extra headers dynamically
    };

    const options = {
      method,
      headers,
      body: data ? JSON.stringify(data) : null, // Only add body for POST, PUT, PATCH
    };

    const response = await fetch(`${backEndBaseUrl}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    return result;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export default apiRequest;