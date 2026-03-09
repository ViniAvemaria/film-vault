import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";
import CardGridSkeleton from "./skeletons/CardGridSkeleton";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import { useList } from "../contexts/ListContext";

const List = () => {
    const { list, clearList } = useList();
    const { fetchMovieDetails } = useMovies();
    const { fetchSeriesDetails } = useSeries();
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const movieResults = await Promise.all([...list.movies].map((id) => fetchMovieDetails(id)));
            const seriesResults = await Promise.all([...list.series].map((id) => fetchSeriesDetails(id)));

            setMovies(movieResults);
            setSeries(seriesResults);
            setLoading(false);
        };

        load();
    }, [list]);

    return (
        <section className="flex flex-col gap-8">
            {loading ? (
                <CardGridSkeleton />
            ) : (
                <>
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">Favourites List</h2>
                        <button
                            className="view-all-button"
                            onClick={() => {
                                if (window.confirm("Clear your favourites list?")) {
                                    clearList();
                                }
                            }}
                        >
                            Clear List
                        </button>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-8">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}

                        {series.map((series) => (
                            <SeriesCard key={series.id} series={series} />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default List;
