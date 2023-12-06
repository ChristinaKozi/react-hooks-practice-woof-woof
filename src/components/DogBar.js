import React from "react";

function DogBar({ dogs, handleClick }) {
    
    const dogCard = dogs.map(dog=> {
        return <span key={dog.id} onClick={()=>handleClick(dog.id)}>{dog.name}</span>
    })

    return (
        <>
            {dogCard}
        </>
    )
}

export default DogBar