import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleSubmit(formData) {
    console.log(formData)
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then(data => {
        console.log(data)
        setToys([...toys, data])
    })
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const updatedArray = toys.filter(toy => toy.id !== id)
      setToys(updatedArray)
    })
  }

  const handleLike = (id, likes) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    })
    .then(r => r.json())
    .then((data) => {
      const updatedArray = toys.map(toy => {
        if (toy.id === id) {
          return {...toy, likes: likes + 1}
        } else {
          return toy
        }
      })
      setToys(updatedArray)
    })
  }


  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(r => r.json())
      .then(data => {
        setToys(data)
      })
  }, [])

  return (
    <>
      <Header />
      {showForm ? <ToyForm onSubmit={handleSubmit}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={handleDelete} setToys={setToys} onLike={handleLike}/>
    </>
  );
}

export default App;
