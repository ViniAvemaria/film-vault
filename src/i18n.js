import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./locale/en-US";
import ptBR from "./locale/pt-BR";

i18n.use(initReactI18next).init({
    resources: {
        "en-US": enUS,
        "pt-BR": ptBR,
    },
    lng: localStorage.getItem("lang") || "pt-BR",
    fallbackLng: "pt-BR",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
