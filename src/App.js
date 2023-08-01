import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import { styled } from 'styled-components';
import Home from './Pages/Home';
import FilmPage from './Pages/FilmPage';
import Contact from './Pages/Contact';
import { useEffect, useState } from 'react';

const App = () => {

    return (
        <AppPage>
            <BrowserRouter>
                <NavBar className=''>
                    <Link to="/">Home</Link>
                    <Link to="/Contact">Contact</Link>
                </NavBar>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/FilmPage/:filmId" element={<FilmPage></FilmPage>}></Route>
                    <Route path="/Contact" element={<Contact></Contact>}></Route>
                </Routes>

                <footer>This is a footer</footer>
            </BrowserRouter>
        </AppPage>


    );
}

const AppPage = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NavBar = styled.nav`
    display: flex;
    
    width: 50%;
    
    align-items: space-between;
    justify-content: space-around;
    
`;

export default App;