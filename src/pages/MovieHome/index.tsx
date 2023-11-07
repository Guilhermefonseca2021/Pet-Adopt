import { useEffect, useState } from "react";


export default function index() {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async(url: ) => {
    fetch('https://')
      .then(response => response.json())
      .then(data => setTopMovies(data))
  }, [])

  useEffect(() => {
    
  }, [])

  return (
    <div>
        Movie
    </div>
  )
}
