import { useEffect, useState } from "react";
import CharacterComponent from "./CharacterComponent";

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [httpQuery, setHttpQuery] = useState('');

  const randomPrefix = Math.floor(Math.random() * 900) + 100;

  useEffect(() => {
    const getResult = async () => {
      const data = await fetch(`https://swapi.dev/api/people/?search=${httpQuery}`).then(resp => resp.json());

      if(data.count > 0) {
        setResult(data.results)
      }
    };

    getResult();
  }, [httpQuery]);
  
  
  // om inget har hänt under det senaste 2 sekunderna, uppdatera värdet på http query
  useEffect(() => {
    setResult([]);
    const queryTimeoutId = setTimeout(() => {
      setHttpQuery(query);
    }, 2000);

    return () => { // det som returneras från en useEffect är en destory funktion (anropas innan komponenten renderas om)
      clearTimeout(queryTimeoutId); //ta bort timeOut när vi renderas om
    };
  }, [query]);


  console.log(query);

  let characterComponents = <p>Loading...</p>;

  if(result.length > 0) {
    characterComponents = result.map(character => 
      <CharacterComponent data={character} key={crypto.randomUUID()} />
    );
  }

  return (
    <>
      <h2>Amazing website</h2>
      <p>Query: #{randomPrefix}-{query}</p>
      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />

      { characterComponents }
    </>
  );
}

export default App;
