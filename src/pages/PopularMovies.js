import React from 'react'
import FilteredMovieList from '../components/FilteredMovieList'

export default function PopularMovies() {
  return (
    <div>
      <h1>Popular Movies</h1>
      <FilteredMovieList type = 'popular'/>
    </div>
  )
}
