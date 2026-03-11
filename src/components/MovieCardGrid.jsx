import { useEffect } from "react";
import MovieCard from "./MovieCard";
import CardGridSkeleton from "./skeletons/CardGridSkeleton";
import { useMovies } from "../contexts/MoviesContext";
import { useTranslation } from "react-i18next";

const MovieCardGrid = () => {
    const { movies, loading, fetchMovies, search, searchMovies, page, setPage, activeTab, totalPages, totalResults } =
        useMovies();

    const { i18n, t } = useTranslation();

    const titles = {
        popular: t("main.cardGrid.movies.popular"),
        top_rated: t("main.cardGrid.movies.topRated"),
        upcoming: t("main.cardGrid.movies.upcoming"),
        search: t("main.cardGrid.searchResults"),
    };

    useEffect(() => {
        if (activeTab === "search") {
            searchMovies();
        } else {
            fetchMovies();
        }
    }, [page, search, activeTab, i18n.language]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const handleNextPage = async () => {
        setPage((prev) => prev + 1);
    };

    const handlePreviousPage = async () => {
        setPage((prev) => prev - 1);
    };

    return (
        <section className="flex flex-col gap-8">
            {loading ? (
                <CardGridSkeleton />
            ) : (
                <>
                    <h2 className="text-2xl font-bold">
                        {titles[activeTab]}
                        {activeTab === "search" && <span className="text-secundary-text">{` (${totalResults})`}</span>}
                    </h2>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-8">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <div>
                        <div className="flex justify-center items-center gap-2 text-primary-text mt-12">
                            <div>
                                <button disabled={page === 1} onClick={handlePreviousPage} className="page-button">
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>
                            </div>

                            <div className="flex px-2.5 py-1 border border-border rounded-lg">
                                <p className="text-center w-2.5 font-semibold">{page}</p>
                            </div>

                            <div>
                                <button disabled={page === totalPages} onClick={handleNextPage} className="page-button">
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default MovieCardGrid;
