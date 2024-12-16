import React, { useEffect, useState } from "react";
import MovieItem from "../MovieItem/MovieItem";

const MovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMovies = async (pageNumber) => {
    setLoading(true);
    let url = "";

    // Determine API endpoint based on category and page number
    if (category === "popular") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=f78a29ca41f945580f00ecd19a11d476&page=${pageNumber}`;
    } else if (category === "airing-now") {
      url = `https://api.themoviedb.org/3/movie/upcoming?api_key=f78a29ca41f945580f00ecd19a11d476&page=${pageNumber}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      // Append newly fetched movies to the current list
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies when the component mounts or when the page changes
  useEffect(() => {
    fetchMovies(page);
  }, [page, category]);

  // Handle loading more movies when the button is clicked
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>{category === "popular" ? "Popular Movies" : "Airing Now Movies"}</h2>
      {loading && page === 1 ? (
        <p>Loading movies...</p>
      ) : (
        <ul className="movie-list">
          {movies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
      {!loading && (
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default MovieList;
