import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = <T,>(url: string | null) => {
  const [apiData, setApiData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<T>(url);
        const data = response?.data;
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setServerError(error.message);
        } else {
          setServerError("An unexpected error ocurred!");
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { isLoading, apiData, serverError };
};

export default useFetch;
