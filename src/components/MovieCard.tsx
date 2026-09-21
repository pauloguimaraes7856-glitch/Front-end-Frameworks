import { useState } from "react";
import { Movie } from "../types";

const FALLBACK_POSTER = "https://placehold.co/300x450?text=No+Poster";

const getPosterUrl = (posterPath: string | null | undefined) => {
  if (!posterPath) return FALLBACK_POSTER;
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <article className="movie-card">
      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
        className="poster-img"
        loading="lazy"
      />
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <p>{movie.vote_average?.toFixed(1)}</p>
        <button onClick={() => setIsFavourite(!isFavourite)}>
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </article>
  );
};

export default MovieCard;