import MovieDisplay from './componets/MovieDisplay'
import Form from './componets/Form'
import { useState, useEffect } from "react";
import './App.css'

export default function App() {
  const apiKey = "d0cc3229";
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(''); // To handle errors

  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
      const data = await response.json();
      if (data.Response === "True" && data.Search.length > 0) {
        setMovie(data.Search[0]);
        setError('');
      } else {
        setError('Movie not found'); // Handle no movie found case
        setMovie(null); // Clear movie data when not found
      }
    } catch (e) {
      setError('Error fetching movie data');
      console.error(e);
    }
  };

  useEffect(() => {
    getMovie("Clueless");
  }, []);

  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      {error && <p>{error}</p>} {/* Display error if any */}
      <MovieDisplay movie={movie} />
    </div>
  );
}
















