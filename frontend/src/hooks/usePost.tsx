import axios from "axios";
import { useState } from "react";
import { ExpensQueriesType } from "../context/ExpensesContext";

type UsePostProps = {
  url: string;
  formData: Record<string, string | number | boolean | null>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDate?: React.Dispatch<React.SetStateAction<ExpensQueriesType>>;
};

const usePost = ({ url, formData, setIsModalOpen, setDate }: UsePostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    //* Prevent fomr refreshing
    e.preventDefault();

    //* if the date is given, then we reset the date, so that we can update later so that we can make a new get request in order to display all the expenses
    if (setDate) {
      setDate((prev) => ({ ...prev, month: 1, year: "" }));
    }
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await axios.post(url, formData);

      //* this is just to get rid of the unusued var error
      if (!response) {
        console.log(response);
      }

      //* here we set the date to trigger the get request
      if (setDate) {
        setDate((prev) => ({
          ...prev,
          month: formData.month as number,
          year: formData.year as string,
        }));
      }
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data);
        if (error?.response?.data) {
          setServerError(error?.response?.data.error);
        } else {
          setServerError("Unknown error happened");
        }
      } else {
        setServerError("An unexpected error occured");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePost, isLoading, serverError };
};

export default usePost;
