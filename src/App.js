import { useState, useEffect, useRef } from 'react';
import { getGalacticPeople, getGalacticCharacter, searchCharacter } from './api/GalaticCharacters';
import './App.css';
import { Details } from './components/Details.js';
import { ListCharacters } from './components/ListCharacters';
import { Pagination } from './components/Pagination';
// import { Searcher } from './components/Searcher';


function App() {
  const inputSearch = useRef(null);
  const [textSearch, setTextSearch] = useState("");
  
  
  const [errorState, setErrorState] = useState({ hasError: false });
  
  const [focusCharacter, setFocusCharacter] = useState(1);
  const [detail, setDetail] = useState({});
  
  const [page, setPage] = useState(1);
  
  const useFetchPeople = () => {
    const [people, setPeople] = useState([]);
    const [isLoaded, SetIsLoaded] = useState(false);
    
    useEffect( ()=>{
      getGalacticPeople(page)
      .then((data) => { setPeople(data) })
      .catch( handleError )
      .finally(() => { SetIsLoaded(true) })
    }, [page]);
    
    return { people, setPeople, isLoaded }
  }
  const { people, setPeople, isLoaded } = useFetchPeople();
  


  useEffect( ()=>{
    getGalacticCharacter(focusCharacter)
    .then(setDetail)
    .catch(handleError);
  }, [focusCharacter])

  const handleError = (err) => {
    setErrorState({hasError: true, message: err.message });
  }

  const showDetails = (character) => {
    const id = Number(character.url.split('/').splice(-2)[0])
    setFocusCharacter(id);
  }

  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = event.current.value;
    setTextSearch(text)
    // console.log(textSearch);
  }

  const onSearchSubmit = (event) => {
    if (event.key !== "Enter") return;

    searchCharacter(textSearch)
    .then((data) => setPeople(data))
    .catch(handleError);

    // inputSearch.current.value = '';
    // setDetail({});
  }

  const onChangePage = (next) => {
    if (!people.previous && page + next <= 0) return
    if (!people.next && page + next >= 9) return

    setPage(page + next);
  }

  let consoleDetail = {
    name: detail.name,
    films: detail.films,
    species: detail.species,
    starships: detail.starships,
    vehicles: detail.vehicles
  }

  return (
    <div>
      <h1>API Star Wars</h1>
      {errorState.hasError && <div>{errorState.message}</div>}
      {
        !isLoaded? <h2>Loading...</h2>
        :
        <main>
          <section>
            <h2>Characters list</h2>
            <input
              id='searcher'
              ref={inputSearch}
              onChange={onChangeTextSearch}
              onKeyDown={onSearchSubmit}
              type="text"
              placeholder="Busca un personaje"
            />
            <ListCharacters 
              people={people}
              showDetails={showDetails}
            />

            <Pagination 
              onChangePage={onChangePage}
              page={page}
            />
          </section>

          { console.log(consoleDetail) }
          {detail && <Details detail={detail} errors={handleError}/>}
        </main>
      }
    </div>
  );
}

export default App;
