import React, { useEffect, useState } from "react";
import DogBar from './DogBar'

function App() {
  const [dogs, setDogs] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3001/pups')
    .then(r=>r.json())
    .then(data => setDogs(data))
  },[])
  console.log(dogs)


  function handleClick(id) {
    const updatedDogs = dogs.map(dog =>
      dog.id === id ? { ...dog, isGoodDog: !dog.isGoodDog } : dog
    );

    setDogs(updatedDogs);

    // Make a PATCH request to update the corresponding pup in the database
    const clickedDog = updatedDogs.find(dog => dog.id === id);

    fetch(`http://localhost:3001/pups/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isGoodDog: clickedDog.isGoodDog }),
    });
  }


  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
        <DogBar handleClick={handleClick} dogs={dogs}/>
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info"></div>
          <div id="dog-info">
          {dogs.map((dog) => (
            <div key={dog.id}>
              <img src={dog.image} alt={dog.name} />
              <h2>{dog.name}</h2>
              <button onClick={() => handleClick(dog.id)}>
                {dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}
              </button>
              </div>
        ))}
      </div>
    </div>
  </div>
);
  }

export default App;
