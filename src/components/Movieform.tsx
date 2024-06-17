
import React, { useState } from 'react';
import axios from "axios";
import Movie from '../models/movie';
import "../styling/Movieform.css";

type Props = {
    onAddMovie: (movie: Movie) => void;
}

function Movieform({ onAddMovie }: Props) {
    const [title, setTitle] = useState("");
    const [poster, setPoster] = useState("");
    const [trailerLink, setTrailerLink] = useState("");
    const key = 'movieDB-hj64bh';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newMovie = {
            title,
            poster,
            trailer_link: trailerLink,
        }

        axios.post(`http://localhost:8080/api/movies?key=${key}`, newMovie)
            .then(response => {
                onAddMovie(response.data.data);

                setTitle('');
                setPoster('');
                setTrailerLink('');
            })
            .catch(error => {
                console.error("Error while adding the movie:", error);
            });
    }

    return (
        <form className="movie-form" onSubmit={handleSubmit}>
            <h1 id="movie-headline">Movie List</h1>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="box"
                placeholder="Enter title..."
            />

            <input
                type="text"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                required
                className="box"
                placeholder="Enter poster link..."
            />

            <input
                type="text"
                value={trailerLink}
                onChange={(e) => setTrailerLink(e.target.value)}
                required
                className="box"
                placeholder="Enter trailer link..."
            />

            <button type="submit" id="add">Add Movie</button>
        </form>
    )
}

export default Movieform;


//please commit 