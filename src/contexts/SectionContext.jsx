import { createContext, useContext, useState, useEffect } from "react";

const SectionContext = createContext(null);

export const SectionProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState(() => {
        return localStorage.getItem("activeSection") || "movies";
    });

    useEffect(() => {
        localStorage.setItem("activeSection", activeSection);
    }, [activeSection]);

    return <SectionContext.Provider value={{ activeSection, setActiveSection }}>{children}</SectionContext.Provider>;
};

export const useSection = () => useContext(SectionContext);
