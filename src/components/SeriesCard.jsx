import { useState } from "react";
import SeriesDetails from "./SeriesDetails";

const SerieCard = ({ series }) => {
    const [posterLoaded, setPosterLoaded] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    return (
        <>
            <div
                onClick={() => setOpenDetails(true)}
                className="flex flex-col gap-2 justify-between max-w-75 bg-card-bg border border-border rounded-lg p-4 cursor-pointer group"
            >
                <div className="relative overflow-hidden aspect-2/3">
                    {!posterLoaded && (
                        <div className="absolute inset-0 bg-secundary-bg overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>
                    )}

                    <img
                        className="object-contain w-full transitio duration-300 group-hover:scale-105"
                        src={`${series.poster_path ? `https://image.tmdb.org/t/p/w1280${series.poster_path}` : "/film-vault/image_unavailable.png"}`}
                        alt="Film's poster"
                        onLoad={() => setPosterLoaded(true)}
                    />
                    <span className="absolute top-0 right-0 flex items-center bg-secundary-bg py-0.75 px-2 rounded-lg m-0.5">
                        <i className="fa-solid fa-star text-accent mr-1 text-sm"></i>
                        {series.vote_average.toFixed(1)}
                    </span>
                </div>

                <div className="flex items-center min-h-10 min-w-56">
                    <h2 className="font-semibold text-accent line-clamp-2 leading-snug">{series.name}</h2>
                </div>
                <h3 className="text-sm text-secundary-text">{series.first_air_date.split("-")[0]}</h3>
            </div>

            {openDetails && <SeriesDetails id={series.id} setOpenDetails={setOpenDetails} />}
        </>
    );
};

export default SerieCard;
