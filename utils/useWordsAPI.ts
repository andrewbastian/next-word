import axios from "axios";

const WordsAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WORDS_API_URL,
  timeout: 1000,
  headers: {
    "X-RapidAPI-Host": `${process.env.NEXT_PUBLIC_WORDS_API_HOST}`,
    "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_WORDS_API_KEY}`,
  },
});

const getSynonyms = async (word: string) => {
  try {
    const res = await WordsAPI.get(`${word}/synonyms`,{timeout: 1500})
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { error: "something went wrong!" };
  }
};

const getDefinition = async (word: string) => {
   try {
       const res = await WordsAPI.get(`${word}/definitions`, {timeout: 1500})
       return res.data
   } catch(err) {
       if(axios.isAxiosError(err)){
           const serverError = err;
           if (serverError && serverError.response) {
              return serverError.response.data 
           }
       }
       return {error: "something went wrong!"}
   }
}

export { getSynonyms, getDefinition }
 

