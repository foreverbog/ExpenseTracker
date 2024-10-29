import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContext.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import ExpenseContextProvider from "./context/ExpensesContext.tsx";
import global_en from "./translations/en/global.json";
import global_de from "./translations/de/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import LanguageContextProvider from "./context/LanguageContext.tsx";
import TripsContextProvider from "./context/TripsContext.tsx";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    de: {
      global: global_de,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <I18nextProvider i18n={i18next}>
          <TripsContextProvider>
            <ExpenseContextProvider>
              <LanguageContextProvider>
                <ThemeContextProvider>
                  <App />
                </ThemeContextProvider>
              </LanguageContextProvider>
            </ExpenseContextProvider>
          </TripsContextProvider>
        </I18nextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
