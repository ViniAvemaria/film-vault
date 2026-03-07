import { useState } from "react";
import Details from "./Details";

const Card = ({ movie }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    return (
        <>
            <div
                onClick={() => setOpenDetails(true)}
                className="flex flex-col gap-2 justify-between max-w-75 bg-card-bg border border-border rounded-lg p-4 cursor-pointer group"
            >
                <div className="relative overflow-hidden">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-secundary-bg rounded-lg overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>
                    )}

                    <img
                        className={`object-contain w-full transitio duration-300 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                        src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        onLoad={() => setImageLoaded(true)}
                    />
                    <span className="absolute top-0 right-0 flex items-center bg-secundary-bg py-0.75 px-2 rounded-lg m-0.5">
                        <i className="fa-solid fa-star text-accent mr-1"></i>
                        {movie.vote_average.toFixed(1)}
                    </span>
                </div>
                <div className="flex items-center line-clamp-2 min-h-10 leading-snug">
                    <h2 className="font-semibold text-accent">{movie.title}</h2>
                </div>
                <h3 className="text-sm text-secundary-text">{movie.release_date.split("-")[0]}</h3>
            </div>

            {openDetails && <Details id={movie.id} setOpenDetails={setOpenDetails} />}
        </>
    );
};

export default Card;
