import { useEffect } from "react";
import SeriesCarousel from "./SeriesCarousel";
import SeriesCardGrid from "./SeriesCardGrid";
import { useSeries } from "../contexts/SeriesContext";
import List from "./List";

const SeriesSection = () => {
    const { activeTab, fetchPopular, fetchTopRated, fetchOnAir, setPage } = useSeries();

    useEffect(() => {
        fetchPopular();
        fetchTopRated();
        fetchOnAir();
    }, []);

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
