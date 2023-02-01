export function ListCharacters( {people, showDetails} ) {
    return (
        <ul className="App">
        {
            people?.results?.map((character) => (
            <li key={character.name} onClick={()=> showDetails(character) } >
                {character.name}
            </li>
            ))
        }
        </ul>
    )
}