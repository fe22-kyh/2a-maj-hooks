import { useState } from "react";

function App() {
  const [username, setUsername] = useState('');

  const randomPrefix = Math.floor(Math.random() * 900) + 100;

  console.log(username);

  return (
    <>
      <h2>Amazing website</h2>
      <p>Username: #{randomPrefix}-{username}</p>
      <input type="text" value={username} onChange={event => setUsername(event.target.value)} />
    </>
  );
}

export default App;
