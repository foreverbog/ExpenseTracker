import { useContext, useEffect, useRef, useState } from "react";
import { TripType } from "./TripsContainer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import useTripsContext from "../../hooks/useTripsContext";
import useDelete from "../../hooks/useDelete";
import DeleteBtn from "../Common/DeleteBtn";
import UpdateBtn from "../Common/UpdateBtn";
import TripsEditModalImagesContainer from "./TripsEditModalImagesContainer";
import TripsEditModalForm from "./TripsEditModalForm";
import TripExpenses from "./TripExpenses";

type TripsEditModalProps = {
  trip: TripType | undefined;
  setTrip: React.Dispatch<React.SetStateAction<TripType | undefined>>;
};

const TripsEditModal: React.FC<TripsEditModalProps> = ({ trip, setTrip }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }
  const { user } = authContext;

  const { t } = useTranslation("global");
  // const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isTripExpenseOpen, setIsTripExpenseOpen] = useState(false);

  //* Ref for submiting the form with an button that is outside the form
  const formRef = useRef<HTMLFormElement | null>(null);

  const { reFetchTrips } = useTripsContext();

  const { handleDelete } = useDelete({
    url: `http://localhost:8080/${user.id}/trips/${trip?.id}`,
    successMessage: "delete",
  });

  //* Delete the trip, retrigger the trips fetch, set tripId to null to close the modal
  const handleDeleteTrip = () => {
    handleDelete();
    reFetchTrips();
    setTrip((prev) => prev && { ...prev, id: null });
  };

  //*useEffect for closing the modal when clicked outside of the modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setTrip((prev) => (prev ? { ...prev, id: null } : undefined));
        setIsTripExpenseOpen((prev) => !prev);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setTrip]);

  return (
    <>
      <div
        ref={modalRef}
        className="fixed  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex justify-center items-center overflow-hidden"
      >
        <motion.div layoutId={trip?.id || undefined}>
          <motion.div
            className="flex flex-col gap-12 p-4 overflow-hidden z-40 bg-base-100 rounded-md min-w-[300px] relative "
            exit={{ height: "40px", transition: { duration: 0.1 } }}
          >
            {isTripExpenseOpen ? (
              //*EXPENSES CONTAINER
              <TripExpenses
                trip={trip}
                setIsTripExpenseOpen={setIsTripExpenseOpen}
                setTrip={setTrip}
              />
            ) : (
              <>
                {/* //*IMAGES CONTAINER */}
                <TripsEditModalImagesContainer trip={trip} setTrip={setTrip} />

                {/* //*FORM FOR EDITING  */}
                <TripsEditModalForm
                  trip={trip}
                  setTrip={setTrip}
                  formRef={formRef}
                  setIsTripExpenseOpen={setIsTripExpenseOpen}
                />

                {/* //*UPDATE AND DELETE BUTTONS */}
                <div className="flex justify-around w-full">
                  <UpdateBtn reference={formRef} btnText={t("update")} />
                  <DeleteBtn
                    btnText={t("delete")}
                    handleDelete={handleDeleteTrip}
                  />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default TripsEditModal;
