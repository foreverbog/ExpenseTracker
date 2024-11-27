import { useTranslation } from "react-i18next";
import DeleteBtn from "../Common/DeleteBtn";
import { useState } from "react";
import UserDeleteModal from "./UserDeleteModal";
import { AnimatePresence } from "framer-motion";

const UserDeleteAccount = () => {
  const { t } = useTranslation("global");

  //*state for tracking the modal for deleting account
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <div className="flex-grow md:flex-grow-0 flex items-end justify-center mb-4  relative">
        <button onClick={() => setIsDeleteModalOpen((prev) => !prev)}>
          <DeleteBtn btnText={t("settings.deleteAcc")} />
        </button>
      </div>

      {/* //*DELETE MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <UserDeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
        )}
      </AnimatePresence>
    </>
  );
};

export default UserDeleteAccount;
