import { useState } from "react";
import axios from "axios";
import { ExpensQueriesType } from "../context/ExpensesContext";

type UseDeleteProps = {
  url: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDate?: React.Dispatch<React.SetStateAction<ExpensQueriesType>>;
  month: number;
  year: string;
};

const useDelete = ({
  url,
  setDate,
  setIsModalOpen,
  month,
  year,
}: UseDeleteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setServerError(null);
    if (setDate) {
      setDate((prev) => ({ ...prev, month: 1, year: "" }));
    }

    try {
      const response = await axios.delete(url);
      if (response) {
        console.log(response);
      }
      //* this is just to get rid of the unusued var error
      if (!response) {
        console.log(response);
      }
      if (setDate) {
        setDate((prev) => ({ ...prev, month, year }));
      }
      setIsModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error?.response?.data);
        if (error?.response?.data) {
          setServerError(error?.response?.data);
        } else {
          setServerError("An unknown error happened");
        }
      } else {
        setServerError("An unexpected error happened");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, serverError, handleDelete };
};

export default useDelete;
