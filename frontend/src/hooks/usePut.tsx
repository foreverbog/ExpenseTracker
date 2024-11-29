import axios from "axios";
import { useState, useEffect } from "react";
import { ExpensQueriesType } from "../context/ExpensesContext";
import { toast, Slide } from "react-toastify";
import Cookies from "js-cookie";

type UsePutProps = {
  url: string;
  formData: Record<string, string | number | boolean | null | undefined>;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setDate?: React.Dispatch<React.SetStateAction<ExpensQueriesType>>;
  successMessage?: string;
};

const usePut = ({
  url,
  formData,
  setIsModalOpen,
  setDate,
  successMessage,
}: UsePutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [JWTtoken, setJWTtoken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setJWTtoken(token);
    }
  }, []);

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
      const config = JWTtoken
        ? {
            headers: {
              Authorization: `Bearer ${JWTtoken}`,
            },
          }
        : {};
      const response = await axios.put(url, formData, config);
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
      //* Close the modal in the end
      if (setIsModalOpen) {
        setIsModalOpen(false);
      }
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
