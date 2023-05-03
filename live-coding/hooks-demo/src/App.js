import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [httpQuery, setHttpQuery] = useState('');

  const randomPrefix = Math.floor(Math.random() * 900) + 100;

  useEffect(() => {
    const getResult = async () => {
      const data = await fetch(`https://swapi.dev/api/people/?search=${query}`).then(resp => resp.json());

      if(data.count > 0) {
        setResult(data.results)
      }
      console.log(data);
    };

    getResult();
  }, [httpQuery]);
  
  
  // om inget har hänt under det senaste 2 sekunderna, uppdatera värdet på http query


  return (
    <>
      <h2>Amazing website</h2>
      <p>Query: #{randomPrefix}-{query}</p>
      <input type="text" value={query} onChange={event => setQuery(event.target.value)} />

      <p>Character name: {(result.length === 0 && "loading...") || result[0].name}</p>
    </>
  );
}

export default App;
