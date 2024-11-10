import React from 'react'
import FilteredMovieList from '../components/FilteredMovieList'

export default function UpComingMovies() {
  return (
    <div>
      <h1>Up Coming Movies</h1>
      <FilteredMovieList type = 'upcoming'/>
    </div>
  )
}
