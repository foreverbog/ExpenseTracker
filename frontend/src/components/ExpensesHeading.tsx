import { useTranslation } from "react-i18next";

type ExpensesHeadingPropsType = {
  activeExpenseType: string;
  handleExpenseTypesSelect: (type: string) => void;
};

const ExpensesHeading: React.FC<ExpensesHeadingPropsType> = ({
  activeExpenseType,
  handleExpenseTypesSelect,
}) => {
  const [t] = useTranslation("global");
  const expensesTypes = [
    t("expenses.types.daily"),
    t("expenses.types.monthly"),
    t("expenses.types.yearly"),
  ];

  return (
    <div className="relative flex text-center mx-auto roundend-full overflow-hidden border-base-200 rounded-md mt-6 w-2/3 text-base-text drop-shadow-2xl">
      <div
        className={`absolute bg-secondary  left-0 top-0 h-full w-1/3 rounded-full z-20  ${
          activeExpenseType === t("expenses.types.daily") && "translate-x-0 "
        } ${
          activeExpenseType === t("expenses.types.monthly") &&
          "translate-x-full"
        }
        ${
          activeExpenseType === t("expenses.types.yearly") &&
          "translate-x-[200%]"
        }
    } transition-transform duration-500 ease-in-out`}
      ></div>
      {expensesTypes.map((type) => (
        <div
          onClick={() => handleExpenseTypesSelect(type)}
          key={type}
          className={`p-2  w-1/3 cursor-pointer transition-colors duration-1000 ease-in-out border-2 border-base-200 rounded-full  ${
            activeExpenseType === type
              ? "text-secondary-text"
              : "text-base-text"
          }`}
        >
          <div className="z-40 relative">{type}</div>
        </div>
      ))}
    </div>
  );
};

export default ExpensesHeading;
