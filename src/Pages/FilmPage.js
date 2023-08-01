import { styled } from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FilmPage = () => {
    const [film, setFilm] = useState({});
    const {filmId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const film = await fetch(`https://ghibliapi.vercel.app/films/${filmId}`);
            const data = await film.json();
            setFilm(data);
        }
        fetchData();
    }, [filmId]);

    return (
        <div>
            <h1>{film.title}</h1>
            <h1>{film.description}</h1>
        </div>
        
    )
};

// const WelcomeMsg = styled.h1`
//     text-align: center;
// `;

export default FilmPage;