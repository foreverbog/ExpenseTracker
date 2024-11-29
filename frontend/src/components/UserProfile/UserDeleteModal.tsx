import { useContext, useEffect, useRef } from "react";
import DeleteBtn from "../Common/DeleteBtn";
import UpdateBtn from "../Common/UpdateBtn";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CiWarning } from "react-icons/ci";
import useDelete from "../../hooks/useDelete";
import { AuthContext } from "../../context/AuthContext";

type UserDeleteModalProps = {
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserDeleteModal: React.FC<UserDeleteModalProps> = ({
  setIsDeleteModalOpen,
}) => {
  const API_URL: string = import.meta.env.VITE_API_SERVER;
  const { t } = useTranslation("global");
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsDeleteModalOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDeleteModalOpen]);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }
  const { user, logout } = authContext;

  const { handleDelete } = useDelete({ url: `${API_URL}/${user.id}` });

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black opacity-60"></div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          translateX: "-50%",
          translateY: "-50%",
        }}
        ref={modalRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-base-100 rounded-md z-50 w-[300px] md:w-[450px] p-2 font-base flex flex-col  gap-8 overflow-hidden "
      >
        <CiWarning className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-4xl scale-[5] -z-10 opacity-10 " />
        <p className=" text-sm text-balance whitespace p-2 text-base-text text-center ">
          {t("settings.deleteConfirm")}
        </p>
        <div className="flex justify-between p-2">
          <button onClick={() => setIsDeleteModalOpen((prev) => !prev)}>
            <UpdateBtn btnText={t("cancel")} />
          </button>
          <button
            onClick={() => {
              handleDelete();
              logout();
              setIsDeleteModalOpen((prev) => !prev);
            }}
          >
            <DeleteBtn btnText={t("yes")} />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default UserDeleteModal;
