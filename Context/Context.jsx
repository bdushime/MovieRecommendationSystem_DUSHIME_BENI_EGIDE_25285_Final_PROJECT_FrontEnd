import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const MovieContext = createContext({
  movies: [],
  filteredMovies: [],
  loading: false,
  error: null,
  searchTerm: '',
  sortCriteria: 'title',
  fetchMovies: () => {},
  setSearchTerm: () => {},
  setSortCriteria: () => {},
  filterMovies: () => {}
});

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('title');

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
      setFilteredMovies(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let result = [...movies];

    // Search filter
    if (searchTerm) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch(sortCriteria) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'releaseYear':
          return b.releaseYear - a.releaseYear;
        default:
          return 0;
      }
    });

    setFilteredMovies(result);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [searchTerm, sortCriteria, movies]);

  return (
    <MovieContext.Provider value={{
      movies,
      filteredMovies,
      loading,
      error,
      searchTerm,
      sortCriteria,
      fetchMovies,
      setSearchTerm,
      setSortCriteria
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;