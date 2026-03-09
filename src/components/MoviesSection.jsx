import { useEffect } from "react";
import MovieCarousel from "./MovieCarousel";
import MovieCardGrid from "./MovieCardGrid";
import { useMovies } from "../contexts/MoviesContext";
import List from "./List";

const MoviesSection = () => {
    const { activeTab, fetchPopular, fetchTopRated, fetchUpcoming } = useMovies();

    useEffect(() => {
        fetchPopular();
        fetchTopRated();
        fetchUpcoming();
    }, []);

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
