import axios from "axios";

export const getApi = async (
    url: string,
  ) => {

    const response = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        return res;
      })
      .catch(error => {
        throw error.response;
      });
  
    return response.data;
  };