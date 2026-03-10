import { useEffect } from "react";
import MovieCarousel from "./MovieCarousel";
import MovieCardGrid from "./MovieCardGrid";
import { useMovies } from "../contexts/MoviesContext";
import List from "./List";

const MoviesSection = () => {
    const { activeTab, fetchPopular, fetchTopRated, fetchUpcoming, setPage } = useMovies();

    useEffect(() => {
        fetchPopular();
        fetchTopRated();
        fetchUpcoming();
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
                    <MovieCarousel rowName={"popular"} />

                    <MovieCarousel rowName={"top_rated"} />

                    <MovieCarousel rowName={"upcoming"} />
                </section>
            ) : activeTab === "list" ? (
                <List />
            ) : (
                <MovieCardGrid />
            )}
        </>
    );
};

export default MoviesSection;
