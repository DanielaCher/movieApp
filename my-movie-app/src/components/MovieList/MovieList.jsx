import React, { useEffect, useState } from "react";
import MovieItem from "../MovieItem/MovieItem";
import { useSelector } from "react-redux";
import "./MovieList.css";

const MovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const favorites = useSelector((state) => state.favorites); // Access favorites from Redux

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
  // Handle loading more movies when the button is clicked
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Fetch movies when the component mounts or when the page changes
  useEffect(() => {
    console.log("Favorites data in MovieList:", favorites); //TODO
    console.log("Movies data in MovieList:", movies); //TODO
    if (category !== "favorites") {
      console.log("Favorites data:", favorites); //TODO: delete
      fetchMovies(page); // Fetch movies only if the category is not favorites
    }
  }, [page, category, favorites]);

  // Filter movies when the category is favorites
  const displayedMovies =
    category === "favorites"
      ? movies
          .filter((movie) => favorites.includes(movie.id))
          .filter((item, index, arr) => arr.indexOf(item) === index) // Ensure no duplicates
      : movies;

  return (
    <div className="movie-list-container">
      <h2 className="header">
        {category === "favorites"
          ? "Favorite Movies"
          : category === "popular"
          ? "Popular Movies"
          : "Airing Now Movies"}
      </h2>
      {loading && page === 1 ? (
        <p>Loading movies...</p>
      ) : (
        <ul className="movie-list">
          {displayedMovies.map((movie) => (
            <MovieItem key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
      {!loading && category !== "favorites" && (
        <button
          className="movie-list-button"
          onClick={handleLoadMore}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default MovieList;
