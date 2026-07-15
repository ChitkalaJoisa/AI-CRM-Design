import axios from "axios";

export const processInteraction = async (
  message,
  currentData
) => {
  const response = await axios.post(
    "http://localhost:8000/api/interactions/chat",
    {
      message,
      current_data: currentData
    }
  );

  return response.data;
};