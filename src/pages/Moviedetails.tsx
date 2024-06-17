import React from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../models/movie';
import "../assets/logo.png"
import "../styling/Moviedetailspage.css"

type Props = {
  movies: Movie[]
  onFavorite: (id: string) => void,
};

function Moviedetails({ movies, onFavorite }: Props) {

  const { id } = useParams<{ id: string }>();
  const movie = movies.find(movie => movie.imdbid === id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>

      <section className="movie-details">
        <h1 id="headline">{movie.title}</h1>
        <h1 id="favorite-marker1" onClick={() => onFavorite(movie.imdbid)}>
          <span className="heart-container">
            {movie.is_favorite ? '❤' : '♡'}
          </span>
        </h1>

      </section>
      <img id="movie-poster" src={movie.poster} alt={movie.title} />
      <br />
      <br />

      <a href={movie.trailer_link} target="_blank" rel="noopener noreferrer">Watch Trailer</a>

    </div>
  );
}

export default Moviedetails;
