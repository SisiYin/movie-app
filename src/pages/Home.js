// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.js';
import FilterTags from '../components/FilterTags.js';
import FilteredMovieList from '../components/FilteredMovieList.js';
import MovieCarouselList from '../components/MovieCarouselList.js';

// const movieData = [
//   { id:1, title: 'Inception', image:inceptionImage, rating: 8.8, releaseDate: '2010-07-16', popularity: 95 },
//   { id:2, title: 'The Matrix', image:matrixImage, rating: 8.7, releaseDate: '1999-03-31', popularity: 90 },
//   { id:3, title: 'Avengers: Endgame', image:endgameImage, rating: 8.4, releaseDate: '2019-04-26', popularity: 100 },
//   { id:4, title: 'The Little Mermaid', image:mermaidImage, rating: 8.6, releaseDate: '2014-11-07', popularity: 85, description: "The adventures of Ariel (Jodi Benson) and her friends at the age of fourteen. From her first known trouble with Ursula (Pat Carroll) to her collection of human objects, the show illustrates the Princess's journey as she finishes growing up. It also introduced new characters such as Ariel's merboy friend (an orphan named Urchin (Danny Cooksey), who her family all saw as a little brother), the snobbish merteen called Pearl (Cree Summer), the Lobster Mobster (Joe Alaskey), Evil Manta (Tim Curry), Sebastian's (Samuel E. Wright's) family, and an orca that Ariel named 'Spot'." },
//   { id:5, title: 'Deadpool & Wolverine', image:deadpoolWolverineImage, rating: 7.6, releaseDate: '2024-11-04', popularity: 75, description: 'A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.'},
  
  
// ];



const Home = () => {
  // const filters = [
  //     { label: 'Top Rated', path: 'toprated' },
  //     { label: 'Up Coming', path: 'upcoming' },
  //     { label: 'Most Popular', path: 'popular' }
  //   ];

  return (
    <div>
    <h1>Movie Website</h1>
    {/* <SearchBar />
    <FilterTags filters={filters}/> */}
    <MovieCarouselList type='now_playing' />
    

    <h2>
      <Link to="/movies/toprated"> Top Rated &gt; </Link>
    </h2>
    <FilteredMovieList type = 'top_rated'/>

    <h2>
      <Link to="/movies/upcoming"> Up Coming &gt; </Link>
    </h2>
    <FilteredMovieList type = 'upcoming'/>

    <h2>
      <Link to="/movies/popular"> Most Popular &gt; </Link>
    </h2>
    <FilteredMovieList type = 'popular'/>


  </div>
  )
};

export default Home;
