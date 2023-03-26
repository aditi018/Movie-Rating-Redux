import {createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from '../../common/apis/MovieApiKey';


export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',
    async ()=>{
    const movieText = "Harry";
    
    const response = await MovieApi.get(
        `?apiKey=${APIKey}&s=${movieText}&type=movie`)
      return response.data;
})

const initialState = {
    movies :{},
}

const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers:{
        addMovies : (state,{payload}) => {
            state.movies = payload;
        }
    },
    extraReducer : {
        [fetchAsyncMovies.pending]: () =>{
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled] : (state,{payload})=>{
            console.log("Fetched Successfully");
            return {...state, movies : payload}
        },
        [fetchAsyncMovies.rejected] : () => {
            console.log("Rejected");
        }
    }
})

export const {addMovies}  = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export default movieSlice.reducer;