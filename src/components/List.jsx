import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";
import CardGridSkeleton from "./skeletons/CardGridSkeleton";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import { useList } from "../contexts/ListContext";
import { useTranslation } from "react-i18next";

const List = () => {
    const { list, clearList } = useList();
    const { fetchMovieDetails } = useMovies();
    const { fetchSeriesDetails } = useSeries();
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    const { i18n, t } = useTranslation();

    useEffect(() => {
        const load = async () => {
            const movieResults = await Promise.all([...list.movies].map((id) => fetchMovieDetails(id)));
            const seriesResults = await Promise.all([...list.series].map((id) => fetchSeriesDetails(id)));

            setMovies(movieResults);
            setSeries(seriesResults);
            setLoading(false);
        };

        load();
    }, [list, i18n.language]);

    return (
        <section className="flex flex-col gap-8">
            {loading ? (
                <CardGridSkeleton />
            ) : (
                <>
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold">{t("main.list.title")}</h2>
                        <button
                            disabled={movies.length === 0 && series.length === 0}
                            className="accent-button"
                            onClick={() => {
                                if (window.confirm(t("main.list.clear.alert"))) {
                                    clearList();
                                }
                            }}
                        >
                            {t("main.list.clear.button")}
                        </button>
                    </div>

                    {movies.length === 0 && series.length === 0 ? (
                        <div className="mt-20">
                            <h2 className="text-center font-semibold text-xl mb-2">{t("main.list.description1")}</h2>
                            <h3 className="text-center text-secundary-text">{t("main.list.description2")}</h3>
                        </div>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-8">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}

                            {series.map((series) => (
                                <SeriesCard key={series.id} series={series} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default List;
