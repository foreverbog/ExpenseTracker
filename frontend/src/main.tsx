import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContext.tsx";

import global_en from "./translations/en/global.json";
import global_de from "./translations/de/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

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
      <I18nextProvider i18n={i18next}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>
);
