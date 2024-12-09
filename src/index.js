import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Authentication, { AuthenticationMode } from './pages/Authentication';
import ErrorPage from './pages/ErrorPage';
import MovieDetail from './pages/MovieDetail';
import MyAccountPage from './pages/MyAccountPage';
// import Header from './components/Header';
// import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from './context/UserProvider';
import reportWebVitals from './reportWebVitals';
// import ShowTimes from './pages/ShowTimes';
import GroupList from './pages/GroupList';
import SearchedMovies from './pages/SearchedMovies';
import PopularMovies from './pages/PopularMovies';
import TopRatedMovies from './pages/TopRatedMovies';
import UpComingMovies from './pages/UpComingMovies';
import MainLayout from './components/MainLayout';
import FinnkinoSchedule from './pages/FinnkinoSchedule';
import PublicShares from './pages/PublicShares';
import MyFavoritesPage from './pages/MyFavoritesPage';
import MyReviewsPage from './pages/MyReviewsPage';
import MyGroupPage from './pages/MyGroupPage';
import AllPublicShares from './pages/AllPublicShares';
import GroupPage from './pages/GroupPage';
import Profile from './pages/Profile';



const router = createBrowserRouter([
  { 
    path: "/",
    element: <MainLayout />,
    // Error
    errorElement: <ErrorPage />,
    children: [
      {
        // No need login
        path: "/signin",
        element: <Authentication authenticationMode={AuthenticationMode.Login} />,
      },
      {
        path: "/signup",
        element: <Authentication authenticationMode={AuthenticationMode.Register} />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/title/:searchTitle",
        element: <SearchedMovies />,
      },
      {
        path: "/movies/popular",
        element: <PopularMovies />,
      },
      {
        path: "/movies/toprated",
        element: <TopRatedMovies />,
      },
      {
        path: "/movies/upcoming",
        element: <UpComingMovies />,
      },
      // {
      //   path: "/movies/nowplaying",
      //   element: <NowPlayingMovies />,
      // },
      {
        path: "/movies/:movieId",
        element: <MovieDetail />,
      },
      {
        path: "/showtimes",
        element: <FinnkinoSchedule />,
      },
      {
        path: "/groups",
        element: <GroupList />,
      },
      {
        path: "/share/:shareUrl",
        element: <PublicShares />,
      },
      {
        path: "/shares",
        element: <AllPublicShares />,
      },

      {
        //need to login
        element: (
          <>
            {/* <Header /> */}
            <ProtectedRoute />
            {/* <Footer /> */}
          </>
        ),
        children: [
          
          {
            path: "/groups/:groupId",
            element: <GroupPage />,
          },
          {
            path: "/user/:id/account",
            element: <MyAccountPage />,
          },
          {
            path: "/user/:id/favorite",
            element: <MyFavoritesPage />,
          },
          {
            path: "/user/:id/review",
            element: <MyReviewsPage />,
          },
          {
            path: "/user/:id/group",
            element: <MyGroupPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router = {router} />
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
