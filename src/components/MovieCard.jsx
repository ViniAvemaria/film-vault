import "./MovieCard.css";

function MovieCard({ movie }) {
    return (
        <>
            <div className="card-container">
                <div className="poster-wrapper">
                    <img src={movie.Poster} alt="movie poster" />
                </div>
                <p>
                    {movie.Title} ({movie.Year})
                </p>
            </div>
        </>
    );
}

export default MovieCard;
