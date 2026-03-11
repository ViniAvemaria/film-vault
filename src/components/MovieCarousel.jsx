import { useState, useRef } from "react";
import SmallMovieCard from "./SmallMovieCard";
import CarouselSkeleton from "./skeletons/CarouselSkeleton";
import { useMovies } from "../contexts/MoviesContext";
import { useTranslation } from "react-i18next";

const MovieCarousel = ({ rowName }) => {
    const { popular, topRated, upcoming, popularLoading, topRatedLoading, upcomingLoading, setActiveTab } = useMovies();
    const movies = rowName === "popular" ? popular : rowName === "top_rated" ? topRated : upcoming;
    const loading =
        rowName === "popular" ? popularLoading : rowName === "top_rated" ? topRatedLoading : upcomingLoading;

    const rowRef = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    const { t } = useTranslation();

    const titles = {
        popular: t("main.carousel.movies.popular"),
        top_rated: t("main.carousel.movies.topRated"),
        upcoming: t("main.carousel.movies.upcoming"),
    };

    const checkScroll = () => {
        const el = rowRef.current;
        setCanLeft(el.scrollLeft > 0);
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    const scroll = (dir) => {
        const cardWidth = 200;
        const gap = 20;
        const container = rowRef.current.clientWidth;

        const visible = Math.floor(container / (cardWidth + gap));
        const amount = visible * (cardWidth + gap);

        rowRef.current.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    return loading ? (
        <CarouselSkeleton />
    ) : (
        <div>
            <div className="flex justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">{titles[rowName] || ""}</h2>
                <button onClick={() => setActiveTab(rowName)} className="accent-button">
                    {t("main.carousel.viewAllButton")}
                </button>
            </div>
            <div className="flex flex-col relative">
                <div
                    ref={rowRef}
                    onScroll={checkScroll}
                    className="flex gap-5 overflow-x-hidden max-sm:overflow-x-scroll"
                >
                    {movies.map((movie) => (
                        <SmallMovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {canLeft && (
                    <div className="flex left-0 top-[40%] absolute px-1 max-sm:hidden">
                        <button onClick={() => scroll("left")} className="arrow-button">
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    </div>
                )}

                {canRight && (
                    <div className="flex right-0 top-[40%] absolute px-1 max-sm:hidden">
                        <button onClick={() => scroll("right")} className="arrow-button">
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCarousel;
