import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MovieList from "./components/MovieList/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./App.css";

function App() {
  const apiKey = "f78a29ca41f945580f00ecd19a11d476";

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList category="popular" />} />
        <Route
          path="/airing-now"
          element={<MovieList category="airing-now" />}
        />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
        <Route path="/favorites" element={<MovieList category="favorites" />} />
      </Routes>
    </Router>
  );
}

export default App;
