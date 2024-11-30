import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MoviesPage.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await axios.delete(`/api/movies/${id}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  useEffect(() => {
    // fetchMovies();
  }, []);

  return (
    <div className="w-full min-h-38 bg-[#2f3640] rounded-lg p-5">
      <h1>Available Movies</h1>

      <a href="/movies/create" className="btn-add">
        Add New Movie
      </a>

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={movie.imageUrl} alt={movie.name} />
            <h2>{movie.name}</h2>
            <p>{movie.description}</p>

            <div className="actions">
              <a href={`/movies/update/${movie.id}`} className="btn btn-edit">
                Edit
              </a>
              <button
                onClick={() => handleDeleteMovie(movie.id)}
                className="btn btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
