import { useEffect, useState } from "react";
import CharacterComponent from "./CharacterComponent";

function useQuerySwapi(path) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined); //samma som null

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await fetch(`https://swapi.dev/api/people/?search=${path}`).then(resp => resp.json());

      if(data.count > 0) {
        setData(data.results);
      }

      setIsLoading(false);
      setError(false);
    }

    const resultTimeoutId = setTimeout(fetchData, 2000);

    return () => { // det som returneras från en useEffect är en destory funktion (anropas innan komponenten renderas om)
      clearTimeout(resultTimeoutId);
    }

  }, [path]);

  return {isLoading, error, data};
}

function App() {
  const [query, setQuery] = useState('');
  const {isLoading, error, data} = useQuerySwapi(query);
  // const swapiHook = useQuerySwapi(query);
  // const isLoading = swapiHook.isLoading;
  // const error = swapiHook.error;
  // const data = swapiHook.data;

  const randomPrefix = Math.floor(Math.random() * 900) + 100;

  // data? --> om data är undefined, blir characterComponents undefined
  let characterComponents = data?.map(character => 
    // TODO på fredag lägger vi till att expandera character info för särskilda characters, inte alla samtidigt
    <CharacterComponent data={character} key={crypto.randomUUID()} />
  );

  return (
    <>
      <h2>Amazing website</h2>
      <p>Query: #{randomPrefix}-{query}</p>
      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />

      { 
        /*
          om isLoading=true evaluera <p>Loading...</p>
          annars evaluera characterComponents
        */
        (isLoading && <p>Loading...</p>) || characterComponents
      }
    </>
  );
}

export default App;
