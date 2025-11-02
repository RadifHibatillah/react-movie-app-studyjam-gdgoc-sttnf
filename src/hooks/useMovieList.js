import { useState, useEffect, useCallback } from 'react';

import * as movieService from '../services/movieService';

/**
 * Hook untuk mengelola daftar movie
 * @returns { movies, loading, error, createMovie, updateMovie, deleteMovie, loadMovies }
 */
export const useMovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await movieService.getAllMovies();
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const createMovie = useCallback(async (formData) => {
    try {
      const newMovie = await movieService.createMovie(formData);
      setMovies(prevMovies => [...prevMovies, newMovie]);
      loadMovies();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadMovies]);

  const updateMovie = useCallback(async (id, formData) => {
    try {
      const updatedMovie = await movieService.updateMovie(id, formData);
      setMovies((prevMovies) =>
        prevMovies.map(movie => (movie.id === id ? updatedMovie : movie))
      );
      loadMovies();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadMovies]);

  const deleteMovie = useCallback(async (id) => {
    try {
      await movieService.deleteMovie(id);
      setMovies(prevMovies => prevMovies.filter((movie) => movie.id !== id));
      loadMovies();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [loadMovies]);

  return { movies, loading, error, createMovie, updateMovie, deleteMovie, loadMovies };
};