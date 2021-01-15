import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDelete, onLike}) {

  

  const toysArray = toys.map(toy => 
    <ToyCard key={toy.id} toy={toy} onDelete={onDelete} onLike={onLike}/>
  )
  return (
    <div id="toy-collection">
      {/* Render the collection of ToyCards */}
      {toysArray}
    </div>
  );
}

export default ToyContainer;
