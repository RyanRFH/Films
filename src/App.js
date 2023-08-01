import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import './App.css';

function App() {

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
    <div className="App">
      <h1 className='errorMessage'>{errorMessage}</h1>
      {films.map((film, index) => {
        return (
            <div className='filmContainer' key={index}>

              <div className={film.modalIsHidden ? 'modalContainer modalHidden' : 'modalContainer modalVisible'} onClick={() => switchModalBool(index)}>
                <div className='modalWrapper'>
                  <h1 className='modalFilmTitle'>{film.title}</h1>
                  <img className='modalFilmImage' src={film.image}></img>
                  <p className='filmDirector'>Director: {film.director}</p>
                  <p className='filmOriginalTitle'>Original Title: {film.original_title} ({film.original_title_romanised})</p>
                  <p className='filmProducer'>Producer: {film.producer}</p>
                  <p className='filmReleaseDate'>ReleaseDate: {film.release_date}</p>
                  <p className='filmRTScore'>Rotten Tomatoes Score: {film.rt_score}/100</p>
                  <p className='filmRunTime'>Run Time: {film.running_time} minutes</p>
                </div>

              </div>

              <div className={pageIsBlurred ? 'filmWrapper blur' : 'filmWrapper'} onClick={() => switchModalBool(index)}>
                <h1 className='filmTitle'>{film.title}</h1>
                <img className='filmImage' src={film.image}></img>
                <p className='filmDescription'>{film.description}</p>
              </div>
            </div>
        )
      })}
    </div>
  );
};

export default App;

  const FilmContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 255, 255, 0.133);
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