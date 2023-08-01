import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import '../App.css';
import { Link } from 'react-router-dom';
function Home() {

  const [films, setFilms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  let [pageIsBlurred, setPageIsBlurred] = useState(false);

  const useEffectFunc = () => {
    const retrieveData = async () => {
      try {
         const response = await fetch("https://ghibliapi.vercel.app/films");

        if (response.ok === false) {
          throw new Error("Error: Data not retrieved");
        }

        const data = await response.json();

        data.map((film, index) => {
          Object.assign(film, {modalIsHidden: true});
        });

        setFilms(data);


        console.log(response);
        console.log(data);
      } catch(err) {
        setErrorMessage(err.message);
        console.log(err.message);
      }
    };
    retrieveData();
  };

  useEffect(useEffectFunc, []);

  const switchModalBool = (index) => {
    setPageIsBlurred(!pageIsBlurred);
    let tempArray = [...films];
    tempArray[index].modalIsHidden = !tempArray[index].modalIsHidden;
    setFilms(tempArray);

  }

  return (
    <FilmsApp>
      <h1 className='errorMessage'>{errorMessage}</h1>
      {films.map((film, index) => {
        return (
            <FilmContainer key={index}>

              <ModalContainer className={film.modalIsHidden ? 'modalHidden' : 'modalVisible'} onClick={() => switchModalBool(index)}>
                <div className='modalWrapper'>
                  <h1 className='modalFilmTitle'>{film.title}</h1>
                  <img className='modalFilmImage' src={film.image}></img>
                  <p>Director: {film.director}</p>
                  <p>Original Title: {film.original_title} ({film.original_title_romanised})</p>
                  <p>Producer: {film.producer}</p>
                  <p>ReleaseDate: {film.release_date}</p>
                  <p>Rotten Tomatoes Score: {film.rt_score}/100</p>
                  <p>Run Time: {film.running_time} minutes</p>
                </div>
              </ModalContainer>

              <FilmWrapper className={pageIsBlurred ? 'blur' : ''} onClick={() => switchModalBool(index)}>
                <h1 className='filmTitle'>{film.title}</h1>
                <img className='filmImage' src={film.image}></img>
                <p className='filmDescription'>{film.description}</p>
              </FilmWrapper>

              <Link to={`/FilmPage/${film.id}`}>
                <button>Go to film page</button>
              </Link>
              

            </FilmContainer>
        )
      })}
    </FilmsApp>
  );
};

export default Home;

  const FilmsApp = styled.div`
    display: flex;
    flex-direction: column;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  `;

  const FilmContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 255, 255, 0.133);
  `;

  const ModalContainer = styled.div`
    justify-content: center;
    color: yellow;
    z-index: 1;
    position: absolute;
    width: 100vw;
    height: 100vh;
    margin: 0px;
    text-align: center;
    font-weight: bold;
    
    //Affects the parent element, using ampersand symbol
    /* &:hover {
      opacity: 15%;
    } */
  `;

  const FilmWrapper = styled.div`
    display: flex;
    width: min-content;
    flex-direction: column;
    align-items: center;
  `;

  // useEffect(() => {
  //   const retrieveData = async () => {
  //     const response = await fetch("https://ghibliapi.vercel.app/films");

  //     const data = await response.json();

  //     setFilms(data);

  //     console.log(data);
  //   };
  //   retrieveData()
  //   }, []);
  
  // <p>{films[0]?.id} = id</p>