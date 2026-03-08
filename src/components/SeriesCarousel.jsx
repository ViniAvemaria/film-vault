import { useState, useRef } from "react";
import SmallSeriesCard from "./SmallSeriesCard";
import CarouselSkeleton from "./skeletons/CarouselSkeleton";
import { useSeries } from "../contexts/SeriesContext";

const SeriesCarousel = ({ rowName }) => {
    const { popular, topRated, onAir, popularLoading, topRatedLoading, onAirLoading, setActiveTab } = useSeries();
    const series = rowName === "popular" ? popular : rowName === "top_rated" ? topRated : onAir;
    const loading = rowName === "popular" ? popularLoading : rowName === "top_rated" ? topRatedLoading : onAirLoading;

    const rowRef = useRef(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);
    const titles = {
        popular: "Popular Series",
        top_rated: "Top Rated Series",
        on_air: "On Air Series",
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{titles[rowName] || ""}</h2>
                <button onClick={() => setActiveTab(rowName)} className="view-all-button">
                    View All
                </button>
            </div>
            <div className="flex flex-col relative">
                <div ref={rowRef} onScroll={checkScroll} className="flex gap-5 overflow-x-hidden">
                    {series.map((series) => (
                        <SmallSeriesCard key={series.id} series={series} />
                    ))}
                </div>

                {canLeft && (
                    <div className="flex left-0 top-[40%] absolute px-1">
                        <button onClick={() => scroll("left")} className="arrow-button">
                            <i className="fa-solid fa-angle-left"></i>
                        </button>
                    </div>
                )}

                {canRight && (
                    <div className="flex right-0 top-[40%] absolute px-1">
                        <button onClick={() => scroll("right")} className="arrow-button">
                            <i className="fa-solid fa-angle-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeriesCarousel;
