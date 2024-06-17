
import React from 'react';
import Movie from '../models/movie';
import "../assets/logo.png";
import Movieform from '../components/Movieform';
import Movielist from '../components/Movielist';

type Props = {
    movies: Movie[];
    onFavorite: (id: string) => void;
    onDelete: (id: string) => void;
    onAddMovie: (movie: Movie) => void;
}

function Moviepage({ movies, onFavorite, onDelete, onAddMovie }: Props) {
    return (
        <div>
            <section>
                <Movieform onAddMovie={onAddMovie} />
            </section>
            <Movielist movies={movies} onFavorite={onFavorite} onDelete={onDelete} />
        </div>
    );
}

export default Moviepage;
