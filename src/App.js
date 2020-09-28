import React, { useState, useEffect } from "react";

import Movie from "./components/Movie";

const FEATURED_API = process.env.REACT_APP_FEATURED_API;
const SEARCH_API = process.env.REACT_APP_SEARCH_API;
function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(async () => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (search) {
      getMovies(SEARCH_API + search);
      setSearch("");
    }
  };
  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search"
            type="search"
            value={search}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie, i) => <Movie key={i} {...movie} />)}
      </div>
    </>
  );
}

export default App;
//
