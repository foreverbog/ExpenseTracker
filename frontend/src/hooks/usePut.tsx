import axios from "axios";
import { useState } from "react";
import { ExpensQueriesType } from "../context/ExpensesContext";

type UsePutProps = {
  url: string;
  formData: Record<string, string | number | boolean | null | undefined>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDate?: React.Dispatch<React.SetStateAction<ExpensQueriesType>>;
};

const usePut = ({ url, formData, setIsModalOpen, setDate }: UsePutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePut = async (e: React.FormEvent<HTMLFormElement>) => {
    // * Prevent auto refresh on submit, set the loading state to true
    e.preventDefault();

    if (setDate) {
      setDate((prev) => ({ ...prev, month: 1, year: "" }));
    }

    setIsLoading(true);
    setServerError(null);

    //* The put request
    try {
      const response = await axios.put(url, formData);
      if (!response) {
        console.log(response);
      }

      if (setDate) {
        setDate((prev) => ({
          ...prev,
          month: formData.month as number,
          year: formData.year as string,
        }));
      }
      //* Close the modal in the end
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data);
        if (error?.response?.data) {
          setServerError(error.response.data.error);
        } else {
          setServerError("Unknown error happend");
        }
      } else {
        setServerError("An unexpected error happened");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, serverError, handlePut, setServerError };
};

export default usePut;
