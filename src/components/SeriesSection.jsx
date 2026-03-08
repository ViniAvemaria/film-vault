import { useEffect } from "react";
import SeriesCarousel from "./SeriesCarousel";
import SeriesCardGrid from "./SeriesCardGrid";
import { useSeries } from "../contexts/SeriesContext";

const SeriesSection = () => {
    const { activeTab, fetchPopular, fetchTopRated, fetchOnAir } = useSeries();

    useEffect(() => {
        fetchPopular();
        fetchTopRated();
        fetchOnAir();
    }, []);

    return (
        <>
            {activeTab === "home" ? (
                <section className="flex flex-col gap-16">
                    <SeriesCarousel rowName={"popular"} />

                    <SeriesCarousel rowName={"top_rated"} />

                    <SeriesCarousel rowName={"on_air"} />
                </section>
            ) : activeTab === "list" ? (
                <div>List</div>
            ) : (
                <SeriesCardGrid />
            )}
        </>
    );
};

export default SeriesSection;
