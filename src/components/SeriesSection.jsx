import { useEffect } from "react";
import SeriesCarousel from "./SeriesCarousel";
import SeriesCardGrid from "./SeriesCardGrid";
import { useSeries } from "../contexts/SeriesContext";
import List from "./List";
import { useTranslation } from "react-i18next";

const SeriesSection = () => {
    const { activeTab, fetchPopular, fetchTopRated, fetchOnAir, setPage } = useSeries();
    const { i18n } = useTranslation();

    useEffect(() => {
        fetchPopular();
        fetchTopRated();
        fetchOnAir();
    }, [i18n.language]);

    useEffect(() => {
        if (activeTab !== "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setPage(1);
    }, [activeTab]);

    return (
        <>
            {activeTab === "home" ? (
                <section className="flex flex-col gap-16">
                    <SeriesCarousel rowName={"popular"} />

                    <SeriesCarousel rowName={"top_rated"} />

                    <SeriesCarousel rowName={"on_the_air"} />
                </section>
            ) : activeTab === "list" ? (
                <List />
            ) : (
                <SeriesCardGrid />
            )}
        </>
    );
};

export default SeriesSection;
