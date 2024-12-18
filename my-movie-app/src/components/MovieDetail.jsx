import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "f78a29ca41f945580f00ecd19a11d476";
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, apiKey]);

  const isFavorite = movie && favorites.includes(movie.id);
  const handleToggleFavorite = () => {
    console.log("Adding/Removing movie with ID:", movie.id); //TODO: Add this log
    if (isFavorite) {
      dispatch(removeFavorite(movie.id)); // Remove from favorites
    } else {
      dispatch(addFavorite(movie.id)); // Add to favorites
    }
  };

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>No movie found.</p>;
  }

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <p>
        <strong>Release Date:</strong>{" "}
        {new Date(movie.release_date).toLocaleDateString()}
      </p>
      <p>{movie.overview}</p>
      <button className="movie-detail-button" onClick={handleToggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default MovieDetail;
