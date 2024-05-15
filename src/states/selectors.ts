import { selectorFamily } from "recoil";
import axios from "axios";

export const checkValidSelector = selectorFamily({
  key: "checkValidSelector",
  get: word=>async () => {
    try {
      const response = await axios.post(`https://wordle-be-1dpe.onrender.com/validWords/isValid`, {
          word: word
      })
      return response.data;
    } catch (error) {
      throw error;
    }
  },
});

