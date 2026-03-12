import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import { useSeries } from "../contexts/SeriesContext";
import { useList } from "../contexts/ListContext";
import { useTranslation } from "react-i18next";

const SeriesDetails = ({ id, setOpenDetails }) => {
    const { fetchSeriesDetails, seriesDetails, setSeriesDetails, seriesLoading } = useSeries();
    const [posterLoaded, setPosterLoaded] = useState(false);
    const [bg, setBg] = useState(null);
    const { addItem, removeItem, isInList } = useList();
    const { t } = useTranslation();

    const formatDate = (date) => {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    };

    const getLanguageName = (code) => new Intl.DisplayNames(["en"], { type: "language" }).of(code);

    useEffect(() => {
        fetchSeriesDetails(id);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    useEffect(() => {
        if (!seriesDetails) return;

        const loadBackdrop = async () => {
            if (!seriesDetails.backdrop_path) {
                setBg("not_found");
                return;
            }

            const img = new Image();
            const url = `https://image.tmdb.org/t/p/w1280${seriesDetails.backdrop_path}`;
            img.src = url;
            img.onload = () => setBg(url);
        };
        loadBackdrop();
    }, [seriesDetails]);

    useEffect(() => {
        return () => {
            setSeriesDetails(null);
            setBg(null);
        };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-20 p-6 max-sm:p-4 flex bg-black/35 backdrop-blur text-primary-text max-[876px]:overflow-scroll">
            {seriesLoading || bg === null || seriesDetails === null ? (
                <Loading />
            ) : (
                <>
                    {!posterLoaded && <Loading />}

                    {bg !== "not_found" && (
                        <div
                            className="absolute inset-0 bg-cover bg-center blur-sm scale-105 max-[876px]:hidden"
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
                            src={`${seriesDetails.poster_path ? `https://image.tmdb.org/t/p/w1280${seriesDetails.poster_path}` : "/film-vault/image_unavailable.png"}`}
                            alt="Film's poster"
                            onLoad={() => setPosterLoaded(true)}
                        />

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-3xl font-bold">{seriesDetails.name}</h2>
                                <h3 className="text-lg italic text-secondary-text">{seriesDetails.tagline}</h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-secondary-text">
                                <span>
                                    <i className="fa-solid fa-star text-accent mr-2"></i>
                                    <span className="text-primary-text mr-1">
                                        {seriesDetails.vote_average.toFixed(1)}
                                    </span>
                                    <span>{`(${seriesDetails.vote_count.toLocaleString()} ${t("main.details.votes")})`}</span>
                                </span>

                                <span>
                                    <i className="fa-solid fa-calendar text-accent mr-2"></i>
                                    {formatDate(seriesDetails.first_air_date)}
                                </span>

                                <span>
                                    <i className="fa-solid fa-tv text-sm text-accent mr-2"></i>
                                    {`${seriesDetails.number_of_seasons} ${t("main.details.series.seasons")} • ${seriesDetails.number_of_episodes} ${t("main.details.series.episodes")}`}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {seriesDetails.genres.map((genre) => (
                                    <span key={genre.id} className="bg-accent px-2.5 py-0.5 rounded-xl text-card-bg">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <p>{seriesDetails.overview}</p>

                            <div className="flex flex-wrap gap-4 justify-between text-secondary-text">
                                <div className="flex gap-2">
                                    <div className="line-h-10">
                                        <i className="fa-solid fa-location-dot text-accent"></i>
                                    </div>
                                    <div>
                                        <p className="mb-1">{t("main.details.production")}</p>
                                        {seriesDetails.production_countries.map((country) => (
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
                                        <p className="mb-1">{t("main.details.language")}</p>
                                        <p className="text-primary-text">
                                            {getLanguageName(seriesDetails.original_language)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 w-80 mt-auto ml-auto max-sm:w-full max-sm:justify-between max-sm:ml-0 max-[876px]:mt-4">
                                <button
                                    onClick={() => {
                                        if (isInList(id, "series")) {
                                            removeItem(id, "series");
                                        } else {
                                            addItem(id);
                                        }
                                    }}
                                    className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover cursor-pointer transition-colors duration-300 ease text-card-bg w-full"
                                >
                                    {isInList(id, "series") ? (
                                        <>
                                            <i className="fa-solid fa-x text-sm mr-2"></i>
                                            {t("main.details.button.remove")}
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa-regular fa-bookmark mr-2"></i>
                                            {t("main.details.button.add")}
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setOpenDetails(false)}
                                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer transition-colors duration-300 ease text-card-bg w-full"
                                >
                                    {t("main.details.button.close")}
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

export default SeriesDetails;
