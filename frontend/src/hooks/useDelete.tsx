import { useState } from "react";
import axios from "axios";
import { ExpensQueriesType } from "../context/ExpensesContext";
import { toast, Slide } from "react-toastify";

type UseDeleteProps = {
  url: string;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setDate?: React.Dispatch<React.SetStateAction<ExpensQueriesType>>;
  month?: number;
  year?: string;
  successMessage?: string;
};

const useDelete = ({
  url,
  setDate,
  setIsModalOpen,
  month,
  year,
  successMessage,
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
      if (setDate && month !== undefined && year !== undefined) {
        setDate((prev) => ({ ...prev, month: month, year }));
      }

      //*Toast with the successfull message
      if (successMessage) {
        toast.success(successMessage, {
          hideProgressBar: true,
          position: "top-center",
          autoClose: 500,
          closeOnClick: true,
          transition: Slide,
          className:
            "bg-base text-center text-xs md:text-normal border border-base-100 text-base-text font-base",
        });
      }

      if (setIsModalOpen) {
        setIsModalOpen(false);
      }
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
