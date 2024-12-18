import React from "react";
import { Link } from "react-router-dom";
import "./MovieItem.css";

const MovieItem = ({ movie }) => {
  return (
    <li className="movie-item">
      <Link to={`/movies/${movie.id}`}>
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-details">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-release-date">
            Release Date: {new Date(movie.release_date).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default MovieItem;
