import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Eye, Download, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const MovieDashboard = ({ userLogin, userRole = [] }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:8080";

  useEffect(() => {
    loadMovies();
  }, [currentPage, pageSize, sortField, sortDirection]);

  useEffect(() => {
    const startIndex = currentPage * pageSize;
    const paginatedMovies = movies.slice(startIndex, startIndex + pageSize);
    setFilteredMovies(paginatedMovies);
  }, [movies, currentPage, pageSize]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/admin_page");
      const sortedMovies = response.data.data.movies.sort((a, b) => a.name.localeCompare(b.name));
      setMovies(sortedMovies);
      setRecommendedMovies(sortedMovies.filter(movie => movie.recommended));
      setTotalPages(Math.ceil(sortedMovies.length / pageSize));
    } catch (error) {
      console.error('Error loading movies:', error);
    }
    setLoading(false);
  };

  

  const getImagePath = (imagePath) => {
    return imagePath.startsWith("/") ? `${BASE_URL}${imagePath}` : imagePath;
  };

  const handleSort = (field) => {
    const direction = sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedMovies = [...movies].sort((a, b) => {
      if (direction === 'asc') return a[field].localeCompare(b[field]);
      return b[field].localeCompare(a[field]);
    });
    setMovies(sortedMovies);
    setSortField(field);
    setSortDirection(direction);
    setCurrentPage(0); // Reset to the first page after sorting
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) setCurrentPage(page);
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white">
      {/* User Container */}
      <div className="bg-[#2f3640] text-center py-12 px-8 border-b-4 border-[#ff4757]">
        <h1 className="text-[#ff4757] text-5xl mb-2">Welcome, {userLogin}!</h1>
        <p className="text-lg">Your role: {userRole.join(', ')}</p>
        <button
            onClick={() => window.location.href = '/login'}
            className="mt-4 bg-[#ff4757] text-white px-6 py-3 rounded flex items-center gap-2 mx-auto hover:bg-[#ff6b81] transition-all duration-300"
        >
          <ArrowLeft size={20}/> Back to Login
        </button>
        {userRole.includes('ADMIN') && (
            <ul className="mt-6">
              <li><a href="/admin/users" className="text-[#ff4757] hover:text-[#ff6b81]">Manage Users</a></li>
            </ul>
        )}
      </div>

      {/* Movies Grid */}
      <div className="p-8">
        <h2 className="text-4xl text-[#ff4757] mb-8 text-center">Available Movies</h2>

        {/* Sort Controls */}
        <div className="flex justify-center gap-4 mb-8">
          {['name', 'description'].map((field) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={`px-6 py-3 rounded transition-all duration-300 
                ${sortField === field ? 'bg-[#ff4757]' : 'bg-[#2f3640]'}`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {sortField === field && (
                <span className="ml-2">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-[#ff4757] text-center my-8">
            <div className="animate-spin h-8 w-8 border-4 border-[#ff4757] border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}

        {/* Movie Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie, index) => (
            <div 
              key={index}
              className="bg-[#2f3640] rounded-lg overflow-hidden shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative pb-[140%]">
                <img 
                  src={getImagePath(movie.imageUrl)}
                  alt={movie.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg'; // Fallback image
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#ff6b81] mb-2 truncate">{movie.name}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.description}</p>
                <div className="flex gap-2 justify-center">
                  <button
                    // href={`/movie/details/${movie.id}`}
                    onClick={() => openModal(movie)}
                    // target='_blank'
                    className="flex-1 bg-[#ff4757] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#ff6b81] transition-duration-300"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <a 
                    href={`http://localhost:8080/movies/${movie.id}/download`}
                    className="flex-1 bg-[#2ed573] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:opacity-80 transition-duration-300"
                  >
                    <Download size={16} />
                    PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>


        {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-[#2f3640] p-8 rounded-lg shadow-lg relative w-[90%] max-w-3xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-[#ff4757] text-white px-4 py-2 rounded hover:bg-[#ff6b81] transition-all"
            >
              Close
            </button>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <img
                  src={`${BASE_URL}${selectedMovie.imageUrl}`}
                  alt={selectedMovie.name}
                  className="w-full lg:w-[300px] h-auto object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg';
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div>
                <h2 className="text-3xl text-[#ff4757] font-bold mb-4">
                  {selectedMovie.name}
                </h2>
                <p className="text-gray-300 mb-4">{selectedMovie.description}</p>
              
              </div>
            </div>
          </div>
        </div>
      )}  

        
      {/* Recommended Movies */}
      <div className="p-8">
        <h2 className="text-4xl text-[#ff4757] mb-8 text-center">Recommended Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedMovies.map((movie, index) => (
            <div 
              key={index}
              className="bg-[#2f3640] rounded-lg overflow-hidden shadow-lg hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative pb-[140%]">
                <img 
                  src={getImagePath(movie.imageUrl)}
                  alt={movie.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder-movie.jpg'; // Fallback image
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-[#ff6b81] mb-2 truncate">{movie.name}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.description}</p>
                <a 
                  href={`/movie/details/${movie.id}`}
                  target='_blank'
                  className="block bg-[#ff4757] text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-[#ff6b81] transition-duration-300"
                >
                  <Eye size={16} /> View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>





        {/* Pagination */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={`p-3 rounded ${
                currentPage === 0 
                  ? 'bg-[#2f3640] opacity-50 cursor-not-allowed' 
                  : 'bg-[#2f3640] hover:bg-[#ff4757]'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={`px-4 py-2 rounded ${
                  currentPage === index ? 'bg-[#ff4757]' : 'bg-[#2f3640] hover:bg-[#ff4757]'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={`p-3 rounded ${
                currentPage === totalPages - 1 
                  ? 'bg-[#2f3640] opacity-50 cursor-not-allowed' 
                  : 'bg-[#2f3640] hover:bg-[#ff4757]'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span>Items per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(0);
              }}
              className="bg-[#2f3640] text-white px-4 py-2 rounded border border-[#ff4757] cursor-pointer"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDashboard;
