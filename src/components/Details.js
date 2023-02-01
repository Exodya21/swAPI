import { useEffect, useState } from 'react';
import { getMoreDetails } from "../api/GalaticCharacters";


export function Details( {detail} ) {
    const [species, setSpecies] = useState([]);
    const [homeworld, setHomeworld] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [films, setFilms] = useState([]);
    const [isLoaded, SetIsLoaded] = useState(false);

    
    useEffect(()=>{
        let dataStarship = [];
        let dataVehicle = [];
        let dataFilm = [];
        let ready1 = false;
        let ready2 = false;
        let ready3 = false;
        
        SetIsLoaded(false)

        try { 
            getMoreDetails(detail.species, 0, 'species')
                .then(setSpecies); 
        } catch (error) { setSpecies({name : 'n/a'}) }

        try { 
            getMoreDetails([detail.homeworld], 0, 'planets')
                .then(setHomeworld); 
        } catch (error) { setHomeworld({name : 'n/a'}) }

        for (let i = 0; i < detail.starships.length; i++) {
            getMoreDetails(detail.starships, i, 'starships')
                .then(res => dataStarship.push(res) );
        }
        setStarships(dataStarship);

        for (let i = 0; i < detail.vehicles.length; i++) {
            getMoreDetails(detail.vehicles, i, 'vehicles')
                .then(res => dataVehicle.push(res) );
        }
        setVehicles(dataVehicle);

        for (let i = 0; i < detail.films.length; i++) {
            getMoreDetails(detail.films, i, 'films')
                .then(res => dataFilm.push(res) );
        }
        setFilms(dataFilm);

        setInterval(() => {
            SetIsLoaded(true);
        }, 3000);

        // if (!(starships && vehicles && films)) SetIsLoaded(true);

        // console.log(detail);
        // console.log(detail.starships);
        // console.log(starships);

    }, [detail]);


    // const useMoreDetails = (detailKey) => {
    //     let dataDetail = [];

    //     for (let i = 0; i < detail[detailKey].length; i++) {
    //         getMoreDetails(detail[detailKey], i, detailKey)
    //             .then(res => dataDetail.push(res) );
    //     }

    //     console.log(dataDetail);
    //     // setStarships(dataDetail);
    //     return dataDetail;
    // }


    return (
        <div>
            <h2>Character detail</h2>
        {
            !isLoaded? <h2>Loading...</h2>
            :
            <aside>
                <h3>{detail.name}</h3>
                <ul>
                    <li>Year of birth: {detail.birth_year}</li>
                    <li>Gender: {detail.gender}</li>
                    <li>Height: {detail.height}</li>
                    <li>Mass: {detail.mass}</li>
                    <li>Skin color: {detail.skin_color}</li>
                    <li>Hair color: {detail.hair_color}</li>
                    <li>Eye color: {detail.eye_color}</li>
                    <li>Species: { species.name? species.name : species }</li>
                    <li>Homeworld: { homeworld.name? homeworld.name : homeworld }</li>
                    <li>Starships: {
                        starships?.map( (starship) => (
                            <p key={starship.name}>{starship.name}</p>
                        ))
                    }</li>
                    <li>Vehicles: {
                        vehicles?.map( (vehicle) => (
                            <p key={vehicle.name}>{vehicle.name}</p>
                        ))
                    }</li>
                    <li>Films: {
                        films?.map( (film) => (
                            <p key={film.title}>{film.title}</p>
                        ))
                    }</li>
                </ul>
            </aside>
        }
        </div>

    )
}