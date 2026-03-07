import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

const Details = ({ id, setOpenDetails }) => {
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [bg, setBg] = useState(null);

    const fetchMovieDetails = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
            });

            setMovie(res.data);
        } catch (err) {
            console.log(err.response?.data?.status_message || "Failed to fetch movies.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    const getLanguageName = (code) => new Intl.DisplayNames(["en"], { type: "language" }).of(code);

    useEffect(() => {
        fetchMovieDetails();
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        if (!movie) return;

        const img = new Image();
        const url = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
        img.src = url;
        img.onload = () => setBg(url);
    }, [movie]);

    return createPortal(
        <div className="fixed inset-0 z-20 p-6 max-sm:p-4 flex bg-black/35 backdrop-blur text-primary-text max-[876px]:overflow-scroll">
            {loading || bg === null || movie === null ? (
                <Loading />
            ) : (
                <>
                    {!loaded && <Loading />}

                    <div
                        className="absolute inset-0 bg-cover bg-center blur-md scale-105"
                        style={{
                            backgroundImage: bg
                                ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${bg})`
                                : "none",
                        }}
                    />

                    <div className="flex max-[876px]:flex-col gap-4 h-fit m-auto z-30 border max-w-225 border-border p-5 bg-card-bg rounded-lg">
                        <img
                            className="object-contain max-w-80 place-self-center"
                            src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                            alt={`${movie.title} poster`}
                            onLoad={() => setLoaded(true)}
                        />

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-bold">{movie.title}</h2>
                                <h3 className="text-lg italic text-secundary-text">{movie.tagline}</h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-secundary-text">
                                <span>
                                    <i className="fa-solid fa-star text-accent mr-2"></i>
                                    <span className="text-primary-text mr-1">{movie.vote_average.toFixed(1)}</span>
                                    <span>{`(${movie.vote_count.toLocaleString()} votes)`}</span>
                                </span>

                                <span>
                                    <i className="fa-solid fa-calendar text-accent mr-2"></i>
                                    {formatDate(movie.release_date)}
                                </span>

                                <span>
                                    <i className="fa-solid fa-clock text-accent mr-2"></i>
                                    {`${movie.runtime} minutes`}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {movie.genres.map((genre) => (
                                    <span key={genre.id} className="bg-accent px-1.75 py-px rounded-xl text-card-bg">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <p>{movie.overview}</p>

                            <div className="flex flex-wrap gap-4 justify-between text-secundary-text">
                                <div className="flex gap-2">
                                    <div className="line-h-10">
                                        <i className="fa-solid fa-location-dot text-accent"></i>
                                    </div>
                                    <div>
                                        <p className="mb-1">Production Countries</p>
                                        {movie.production_countries.map((country) => (
                                            <p key={country.iso_3166_1} className="text-primary-text">
                                                {country.name}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <div className="line-h-10">
                                        <i className="fa-solid fa-globe text-accent"></i>
                                    </div>
                                    <div>
                                        <p className="mb-1">Original Language</p>
                                        <p className="text-primary-text">{getLanguageName(movie.original_language)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-auto ml-auto max-sm:justify-between max-sm:ml-0 max-[876px]:mt-4">
                                <button className="px-2.5 py-1.25 rounded-lg bg-accent hover:bg-accent-hover cursor-pointer transition-colors duration-300 ease text-card-bg max-sm:w-full">
                                    <i className="fa-solid fa-bookmark mr-1"></i>
                                    Add
                                </button>
                                <button
                                    onClick={() => setOpenDetails(false)}
                                    className="px-2.5 py-1.25 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer transition-colors duration-300 ease text-card-bg max-sm:w-full"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>,
        document.body,
    );
};

export default Details;
