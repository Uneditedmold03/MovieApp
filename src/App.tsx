

import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Movie from './models/movie';
import Moviepage from './pages/Moviepage';
import Moviedetails from './pages/Moviedetails';
import "./assets/logo.png";

function App() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const key = 'movieDB-hj64bh';

  useEffect(() => {
    getMovies();
  }, []);

  function getMovies() {
    axios.get(`http://localhost:8080/api/movies?key=${key}`)
      .then(response => {
        setMovieList(response.data.data);
        console.log(response.data);
      });
  }

  const handleFavorite = (id: string) => {
    const movie = movieList.find(movie => movie.imdbid === id);
    if (movie) {
      const url = `http://localhost:8080/api/movies/${id}?key=${key}`;
      const updatedMovie = { ...movie, is_favorite: !movie.is_favorite };

      axios.put(url, updatedMovie)
        .then(response => {
          setMovieList(prevMovies =>
            prevMovies.map(movie =>
              movie.imdbid === id ? { ...movie, is_favorite: !movie.is_favorite } : movie
            )
          )
        })
        .catch(error => {
          console.error("There was an error updating the movie!", error);
        })
    }
  }

  const handleAddMovie = (newMovie: Movie) => {
    axios.post(`http://localhost:8080/api/movies?key=${key}`, newMovie)
      .then(response => {
        const addedMovie = response.data.data;

        setMovieList((prevMovies) => [...prevMovies, addedMovie]);

        getMovies();
      })
      .catch(error => {
        console.error("ERROR", error);
      });
  }
  
  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:8080/api/movies/${id}?key=${key}`)
      .then(response => {
        setMovieList(prevMovies => prevMovies.filter(movie => movie.imdbid !== id));
      })
      .catch(error => {
        console.error("Error Invalid ID!", error);
      })
  }

  useEffect(() => {
    console.log(movieList);
  }, [movieList]);

  return (
    <div className="routing">
      <img src="./src/assets/logo.png" alt="" />
      <Routes>
        <Route path="/" element={<Moviepage movies={movieList} onFavorite={handleFavorite} onDelete={handleDelete} onAddMovie={handleAddMovie} />} />
        <Route path="/movie/:id" element={<Moviedetails movies={movieList} onFavorite={handleFavorite} />} />
      </Routes>
    </div>
  );
}

export default App;
