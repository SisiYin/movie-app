import React from 'react'
import { useParams } from 'react-router-dom';
import SearchedMovieList from '../components/SearchedMovieList'

export default function SearchedMovies() {
  const { searchTitle } = useParams();
  console.log(searchTitle)
  return (
    <div>
      <h1>Searched "{searchTitle}"</h1>
      <SearchedMovieList searchTitle={searchTitle} />
    </div>
  )
}

