import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const addMovie = (movie) => {
    setMovies((prev) => [...prev, movie]);
  };

  const updateMovie = (updatedMovie) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
    );
  };

  const deleteMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  // 🔥 Kanban sync
  const updateMovieStatus = (id, status) => {
    setMovies((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status } : m
      )
    );
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        addMovie,
        updateMovie,
        deleteMovie,
        updateMovieStatus,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);