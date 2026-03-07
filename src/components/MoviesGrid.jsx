import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import MoviesGridSkeleton from "./skeletons/MoviesGridSkeleton";

const AllMovies = ({ activeTab }) => {
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const titles = {
        popular: "Popular Movies",
        top_rated: "Top Rated Movies",
        upcoming: "Upcoming Movies",
    };

    const fetchMovies = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${activeTab}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: {
                    page: page,
                },
            });

            setTotalPages(res.data.total_pages);
            setMovies(res.data.results);
        } catch (err) {
            console.log(err.response?.data?.status_message || "Failed to fetch movies.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [page]);

    const handleNextPage = async () => {
        setLoading(true);
        setPage((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePreviousPage = async () => {
        setLoading(true);
        setPage((prev) => prev - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <section className="flex flex-col gap-8">
            {loading ? (
                <MoviesGridSkeleton />
            ) : (
                <>
                    <h2 className="text-2xl font-bold">{titles[activeTab] || ""}</h2>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-8">
                        {movies.map((movie) => (
                            <Card key={movie.id} movie={movie} />
                        ))}
                    </div>

                    <div>
                        <div className="flex justify-center items-center gap-2 text-primary-text dark:text-primary-text-dark mt-12">
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

export default AllMovies;
