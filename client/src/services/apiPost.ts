import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const getPosts = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/posts`);
    return res.data; // Axios automatically parses JSON
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch posts");
  }
};
