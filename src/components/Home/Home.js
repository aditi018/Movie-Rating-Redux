import React ,{useEffect} from 'react';
import MovieListing from "../MovieListing/MovieListing";
import MovieApi from '../../common/apis/MovieApi';
import { APIKey } from '../../common/apis/MovieApiKey';
import { useDispatch } from 'react-redux';
import { addMovies, addShows } from '../../features/movies/movieSlice';


function Home() {

  const dispatch = useDispatch();
  useEffect(()=>{
    const movieText = "Harry";
    const showText = "Friends";
    
    const fetchMovies = async() =>{
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${movieText}&type=movie`
    ).catch((err) =>{
      console.log(err);
    });
    dispatch(addMovies(response.data));
  }

  const fetchShows = async() =>{
    const response = await MovieApi.get(
      `?apiKey=${APIKey}&s=${showText}&s=series`
    ).catch((err) => {
      console.log(err);
    });
    dispatch(addShows(response.data));
  }


  fetchMovies();
  fetchShows();
  },[]);

  return (
    <div>
      <div className='banner-image'></div>
      <MovieListing />
    </div>
  )
}

export default Home
