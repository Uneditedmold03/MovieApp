import React from 'react';
import Movie from '../models/movie';
import { Link } from 'react-router-dom';
import "../styling/Movielist.css";
import axios from 'axios';

type Props = {
    movies: Movie[],
    onFavorite: (id: string) => void,
    onDelete: (id: string) => void
}

function Movielist({ movies, onFavorite, onDelete }: Props) {

    return (
        <article className="movies">
            {movies.map((movie, index) => (
                <div key={index} className="movie-object">
                    
                    <Link to={`/movie/${movie.imdbid}`}>
                    <img src={movie.poster} alt={movie.title} className="movie-poster" />
                    </Link>

                    <Link to={`/movie/${movie.imdbid}`} className="movie-link">
                        <div className="movie-title">{movie.title}</div>
                    </Link>

                    <h1 id="favorite-marker" onClick={() => onFavorite(movie.imdbid)}>
                        {movie.is_favorite ? '❤' : '♡'}
                    </h1>
                    <h1 id="delete-marker" onClick={() => onDelete(movie.imdbid)}>✖</h1>
                </div>
            ))}
        </article>
    );
}

export default Movielist;

//please commit