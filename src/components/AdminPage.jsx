import React, { useState, useEffect } from 'react';
// import { Chart } from 'react-chartjs-2';
import { 
  AlertCircle, 
  CheckCircle2, 
  Film, 
  Users, 
  Activity 
} from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editingMovie, setEditingMovie] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const movies_users_logsRes = await axios.get("http://localhost:8080/admin_page");
      console.log(movies_users_logsRes.data.data.movies.sort((a, b) => a.name.localeCompare(b.name)));
      setMovies(movies_users_logsRes.data.data.movies.sort((a, b) => a.name.localeCompare(b.name)));
      setUsers(movies_users_logsRes.data.data.users);
      setAuditLogs(movies_users_logsRes.data.data.auditLogs);
    } catch (error) {
      console.log(error)
      setErrorMessage("Failed to fetch data");
    }
  };

  const handleCreateMovie = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await axios.post("http://localhost:8080/admin_page", formData);
      if (response.data.success) {
        setSuccessMessage("Movie created successfully!");
        fetchData();
        e.target.reset();
      } else {
        throw new Error("Failed to create movie");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleUpdateMovie = async (e, movieId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const response = await fetch(`http://localhost:8080/movies/update/${movieId}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        setSuccessMessage("Movie updated successfully!");
        setEditingMovie(null);
        fetchData();
      } else {
        throw new Error("Failed to update movie");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      const response = await fetch(`http://localhost:8080/movies/delete/${movieId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSuccessMessage("Movie deleted successfully!");
        fetchData();
      } else {
        throw new Error("Failed to delete movie");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleToggleRecommendation = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:8080/movies/toggleRecommendation/${movieId}`, {
        method: "POST",
      });
      console.log(response)
      if (response.ok) {
        setSuccessMessage("Recommendation updated successfully!");
        fetchData();
      } else {
        throw new Error("Failed to update recommendation");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSearchMovie = async (e) => {
    e.preventDefault();
    const searchId = e.target.elements.id.value;
    try {
      const response = await axios.get(`http://localhost:8080/movies/search/${searchId}`);
      console.log(response);
      setSearchResult(response.data);
      setSearchError(null);
    } catch (error) {
      setSearchError("Error searching for movie");
      setSearchError(error.response?.data?.message || "Error searching for movie");
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Alert Messages */}
      {successMessage && (
        <div className="flex items-center bg-green-600 text-white p-4 mb-4 rounded">
          <CheckCircle2 className="mr-2" />
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="flex items-center bg-red-600 text-white p-4 mb-4 rounded">
          <AlertCircle className="mr-2" />
          {errorMessage}
        </div>
      )}

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-2">
          Admin Dashboard
        </h1>
      </div>

      {/* Create Movie Form */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Film className="mr-2" />
          Create New Movie
        </h2>
        <form onSubmit={handleCreateMovie} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Movie Name"
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
            <input
              type="file"
              name="imageFile"
              className="w-full p-2 bg-gray-700 rounded"
              required
            />
          </div>
          <textarea
            name="description"
            placeholder="Movie Description"
            className="w-full p-2 bg-gray-700 rounded h-24"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Create Movie
          </button>
        </form>
      </div>

      {/* Search Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Search Movie</h2>
        <form onSubmit={handleSearchMovie} className="flex gap-4">
          <input
            type="text"
            name="id"
            placeholder="Movie ID"
            className="flex-1 p-2 bg-gray-700 rounded"
            required
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Search
          </button>
        </form>
        {searchResult && (
          <div className="mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-600 p-2">Name</th>
                  <th className="border border-gray-600 p-2">Description</th>
                  <th className="border border-gray-600 p-2">Image</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 p-2">{searchResult.name}</td>
                  <td className="border border-gray-600 p-2">{searchResult.description}</td>
                  <td className="border border-gray-600 p-2">
                    <img
                      src={searchResult.imageUrl}
                      alt="Movie"
                      className="w-24 h-auto mx-auto"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {searchError && (
          <p className="text-red-500 mt-2">{searchError}</p>
        )}
      </div>

      {/* Movies List */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Film className="mr-2" />
          Available Movies
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Name</th>
                <th className="border border-gray-600 p-2">Description</th>
                <th className="border border-gray-600 p-2">Image</th>
                <th className="border border-gray-600 p-2">Recommended</th>
                <th className="border border-gray-600 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="border border-gray-600 p-2">
                    {editingMovie === movie.id ? (
                      <input
                        type="text"
                        defaultValue={movie.name}
                        className="w-full p-1 bg-gray-700 rounded"
                      />
                    ) : (
                      movie.name
                    )}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {editingMovie === movie.id ? (
                      <textarea
                        defaultValue={movie.description}
                        className="w-full p-1 bg-gray-700 rounded"
                      />
                    ) : (
                      movie.description
                    )}
                  </td>
                  <td className="border border-gray-600 p-2">
                    <img
                      src={movie.imageUrl}
                      alt="Movie"
                      className="w-24 h-auto mx-auto"
                    />
                  </td>
                  <td className="border border-gray-600 p-2">
                    <button
                      onClick={() => handleToggleRecommendation(movie.id)}
                      className={`px-4 py-2 rounded ${
                        movie.recommended
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-500 hover:bg-gray-600'
                      }`}
                    >
                      {movie.recommended ? 'Recommended' : 'Not Recommended'}
                    </button>
                  </td>
                  <td className="border border-gray-600 p-2">
                    {editingMovie === movie.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleUpdateMovie(e, movie.id)}
                          className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMovie(null)}
                          className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingMovie(movie.id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMovie(movie.id)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Users className="mr-2" />
          Registered Users
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">Username</th>
                <th className="border border-gray-600 p-2">Email</th>
                <th className="border border-gray-600 p-2">Role</th>
                <th className="border border-gray-600 p-2">Allowed Menu</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-600 p-2">{user.login}</td>
                  <td className="border border-gray-600 p-2">{user.email}</td>
                  <td className="border border-gray-600 p-2">{user.role}</td>
                  <td className="border border-gray-600 p-2">
                    {user.role === 'ADMIN' ? 'Admin Menu' : 'Personal Menu'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Activity className="mr-2" />
          Audit Logs
        </h2>
        <div className="mb-8">
          {/* <canvas id="auditChart" className="w-full h-64"></canvas> */}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Action</th>
                <th className="border border-gray-600 p-2">Username</th>
                <th className="border border-gray-600 p-2">Timestamp</th>
                <th className="border border-gray-600 p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td className="border border-gray-600 p-2">{log.id}</td>
                  <td className="border border-gray-600 p-2">{log.action}</td>
                  <td className="border border-gray-600 p-2">{log.username}</td>
                  <td className="border border-gray-600 p-2">{log.timestamp}</td>
                  <td className="border border-gray-600 p-2">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
  )}

  export default AdminDashboard;