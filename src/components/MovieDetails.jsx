import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import { useList } from "../contexts/ListContext";

const MovieDetails = ({ id, setOpenDetails }) => {
    const { fetchMovieDetails, movieDetails, setMovieDetails, movieLoading, activeTab: moviesTab } = useMovies();
    const { activeTab: seriesTab } = useSeries();
    const [posterLoaded, setPosterLoaded] = useState(false);
    const [bg, setBg] = useState(null);
    const { addItem, removeItem, isInList } = useList();
    const activeTab = moviesTab === "list" || seriesTab === "list" ? "list" : "";

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    const getLanguageName = (code) => new Intl.DisplayNames(["en"], { type: "language" }).of(code);

    useEffect(() => {
        fetchMovieDetails(id);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        if (!movieDetails) return;

        const load = async () => {
            if (!movieDetails.backdrop_path) {
                setBg("not_found");
                return;
            }

            const img = new Image();
            const url = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`;
            img.src = url;
            img.onload = () => setBg(url);
        };
        load();
    }, [movieDetails]);

    useEffect(() => {
        return () => {
            setMovieDetails(null);
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-20 p-6 max-sm:p-4 flex bg-black/35 backdrop-blur text-primary-text max-[876px]:overflow-scroll">
            {movieLoading || bg === null || movieDetails === null ? (
                <Loading />
            ) : (
                <>
                    {!posterLoaded && <Loading />}

                    {bg !== "not_found" && (
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                            style={{
                                backgroundImage: bg
                                    ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${bg})`
                                    : "none",
                            }}
                        />
                    )}

                    <div className="flex max-[876px]:flex-col gap-4 h-fit m-auto z-30 border max-w-225 border-border p-5 bg-card-bg rounded-lg">
                        <img
                            className="object-contain max-w-80 max-[876px]:place-self-center"
                            src={`${movieDetails.poster_path ? `https://image.tmdb.org/t/p/w1280${movieDetails.poster_path}` : "/film-vault/image_unavailable.png"}`}
                            alt="Film's poster"
                            onLoad={() => setPosterLoaded(true)}
                        />

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-bold">{movieDetails.title}</h2>
                                <h3 className="text-lg italic text-secundary-text">{movieDetails.tagline}</h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-secundary-text">
                                <span>
                                    <i className="fa-solid fa-star text-accent mr-2"></i>
                                    <span className="text-primary-text mr-1">
                                        {movieDetails.vote_average.toFixed(1)}
                                    </span>
                                    <span>{`(${movieDetails.vote_count.toLocaleString()} votes)`}</span>
                                </span>

                                <span>
                                    <i className="fa-solid fa-calendar text-accent mr-2"></i>
                                    {formatDate(movieDetails.release_date)}
                                </span>

                                <span>
                                    <i className="fa-solid fa-clock text-accent mr-2"></i>
                                    {`${movieDetails.runtime} minutes`}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {movieDetails.genres.map((genre) => (
                                    <span key={genre.id} className="bg-accent px-1.75 py-px rounded-xl text-card-bg">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <p>{movieDetails.overview}</p>

                            <div className="flex flex-wrap gap-4 justify-between text-secundary-text">
                                <div className="flex gap-2">
                                    <div className="line-h-10">
                                        <i className="fa-solid fa-location-dot text-accent"></i>
                                    </div>
                                    <div>
                                        <p className="mb-1">Production Countries</p>
                                        {movieDetails.production_countries.map((country) => (
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
                                        <p className="text-primary-text">
                                            {getLanguageName(movieDetails.original_language)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-auto ml-auto max-sm:justify-between max-sm:ml-0 max-[876px]:mt-4">
                                <button
                                    onClick={() => {
                                        if (isInList(id, "movies") && activeTab === "list") {
                                            removeItem(id, "movies");
                                        } else {
                                            addItem(id);
                                        }
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover cursor-pointer transition-colors duration-300 ease text-card-bg max-sm:w-full"
                                >
                                    {isInList(id, "movies") && activeTab === "list" ? (
                                        <>
                                            <i className="fa-solid fa-x text-sm mr-2"></i>
                                            Remove
                                        </>
                                    ) : (
                                        <>
                                            {" "}
                                            <i className="fa-regular fa-bookmark mr-2"></i>
                                            Add
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setOpenDetails(false)}
                                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer transition-colors duration-300 ease text-card-bg max-sm:w-full"
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

export default MovieDetails;
