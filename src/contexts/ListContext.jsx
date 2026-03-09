import { createContext, useContext, useState, useEffect } from "react";
import { useSection } from "./SectionContext";

const ListContext = createContext(null);

export const ListProvider = ({ children }) => {
    const { activeSection } = useSection();

    const [list, setList] = useState(() => {
        const stored = localStorage.getItem("list");

        if (!stored) {
            return {
                movies: new Set(),
                series: new Set(),
            };
        }

        const parsed = JSON.parse(stored);

        return {
            movies: new Set(parsed.movies),
            series: new Set(parsed.series),
        };
    });

    useEffect(() => {
        localStorage.setItem(
            "list",
            JSON.stringify({
                movies: [...list.movies],
                series: [...list.series],
            }),
        );
    }, [list]);

    const addItem = (id) => {
        setList((prev) => {
            const updated = new Set(prev[activeSection]);
            updated.add(id);
            return { ...prev, [activeSection]: updated };
        });
    };

    const removeItem = (id, type) => {
        setList((prev) => {
            const updated = new Set(prev[type]);
            updated.delete(id);
            return { ...prev, [type]: updated };
        });
    };

    const clearList = () => {
        setList({
            movies: new Set(),
            series: new Set(),
        });
    };

    const isInList = (id, type) => {
        return list[type].has(id);
    };

    const value = {
        list,
        addItem,
        removeItem,
        clearList,
        isInList,
    };

    return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useList = () => useContext(ListContext);
