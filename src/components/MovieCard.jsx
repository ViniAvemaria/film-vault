import posterUnavailable from "../assets/poster-unavailable.png";
import "./MovieCard.css";

function MovieCard({ movie }) {
    return (
        <>
            <div className="card-container">
                <div className="poster-wrapper">
                    <img
                        src={movie.Poster !== "N/A" ? movie.Poster : posterUnavailable}
                        alt={`${movie.Title} poster`}
                        onError={(e) => {
                            e.target.src = posterUnavailable;
                        }}
                    />
                </div>
                <p>
                    {movie.Title} ({movie.Year})
                </p>
            </div>
        </>
    );
}

export default MovieCard;
