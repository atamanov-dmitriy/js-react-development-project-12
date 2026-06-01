import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { persistor, store } from "./@redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import App from "./app.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Sockets from "./model/sockets.tsx";
import { ru } from "./@i18next/ru.ts";
import filter from "leo-profanity";

const init = async () => {
  filter.loadDictionary("ru");

  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    resources: {
      ru,
    },
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
    debug: false,
  });

  return createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <App />
            <ToastContainer />
            <Sockets />
          </I18nextProvider>
        </PersistGate>
      </StoreProvider>
    </StrictMode>,
  );
};

init();
