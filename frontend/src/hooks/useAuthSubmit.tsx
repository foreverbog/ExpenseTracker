import { useNavigate } from "react-router-dom";
import { AuthFormDataType } from "../pages/Authentication";
import { useState } from "react";
import axios from "axios";
import { toast, Zoom } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type UseAuthSubmitProps = {
  url: string;
  redirectUrl: string;
  succesMessage: string;
  resetForm: () => void;
  authData: AuthFormDataType;
};

const useAuthSubmit = ({
  url,
  redirectUrl,
  succesMessage,
  resetForm,
  authData,
}: UseAuthSubmitProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used within an AuthContextProvider");
  }

  const { login } = authContext;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await axios.post(url, authData);

      const data = response.data;
      // console.log(data);
      login(data.token);
      setIsLoading(false);
      if (resetForm) resetForm();

      if (succesMessage) {
        toast.success(succesMessage, {
          hideProgressBar: true,
          position: "top-center",
          autoClose: 1500,
          closeOnClick: true,
          transition: Zoom,
          className: "bg-base text-center text-sm",
        });
      }

      if (redirectUrl) {
        navigate(redirectUrl);
      }
    } catch (error: unknown) {
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
      console.log(serverError);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, serverError, handleSubmit };
};

export default useAuthSubmit;
