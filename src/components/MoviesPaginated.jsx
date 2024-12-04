import React, {useState, useEffect} from "react";
import axios from "axios";
// import "./MoviesPaginated.css";

const MoviesPaginated = () => {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [direction, setDirection] = useState("asc");

    const fetchMovies = async () => {
        try {
            const response = await axios.get("/api/movies/paginated", {
                params: {
                    page: currentPage,
                    size: pageSize,
                    sortBy,
                    direction,
                    keyword,
                },
            });
            setMovies(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        // fetchMovies();
    }, [currentPage, pageSize, sortBy, direction, keyword]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        fetchMovies();
    };

    const handleSort = (field) => {
        setSortBy(field);
        setDirection(direction === "asc" ? "desc" : "asc");
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(0);
    };

    return (
        <div className="w-full min-h-38 bg-[#2f3640] rounded-lg p-5">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search movies..."
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                            Search
                        </button>
                    </div>
                </div>
            </form>

            {/* Sorting Options */}
            <div className="mb-3">
                <span>Sort By: </span>
                <button
                    className="btn btn-link p-0"
                    onClick={() => handleSort("name")}
                >
                    Name {sortBy === "name" && (direction === "asc" ? "↑" : "↓")}
                </button>
                {" "}
                |
                <button
                    className="btn btn-link p-0"
                    onClick={() => handleSort("description")}
                >
                    Description {sortBy === "description" && (direction === "asc" ? "↑" : "↓")}
                </button>
            </div>

            {/* Movies Grid */}
            <div className="row">
                {movies.map((movie) => (
                    <div className="col-md-4 mb-4" key={movie.id}>
                        <div className="card">
                            <img src={movie.imageUrl} className="card-img-top" alt="Movie"/>
                            <div className="card-body">
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{movie.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, pageNum) => (
                            <li
                                key={pageNum}
                                className={`page-item ${currentPage === pageNum ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage(pageNum)}
                                >
                                    {pageNum + 1}
                                </button>
                            </li>
                        ))}
                        <li
                            className={`page-item ${
                                currentPage === totalPages - 1 ? "disabled" : ""
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                                }
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {/* Page Size Selector */}
            <div className="text-center mt-3">
                <span>Items per page: </span>
                <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="form-control d-inline w-auto"
                >
                    {[5, 10, 20, 50].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MoviesPaginated;
