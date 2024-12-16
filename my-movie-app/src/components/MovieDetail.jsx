import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "f78a29ca41f945580f00ecd19a11d476";

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
  }, [movieId]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>No movie found.</p>;
  }

  return (
    <div>
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
    </div>
  );
};

export default MovieDetail;
