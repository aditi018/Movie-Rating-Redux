import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import MovieApi from "../../common/apis/MovieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',
async()=>{
    const moviesText = "Harry";

    const response = await MovieApi.get(
        `?apiKey=${APIKey}&s=${moviesText}&type=movie`,
    );
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk('shows/fetchAsyncShows',
async() =>{
    const showText = "Friends";

    const response = await MovieApi.get(
        `?apiKey=${APIKey}&s=${showText}&type=series`
    );
    return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk ( 'movies/fetchAsyncMovieOrShowDetail',
async(id) => {
    const response = await MovieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`
    );
    return response.data;
})

const initialState = {
    movies :{},
    shows:{},
    selectedMovieOrShow : {},
}


const movieSlice = createSlice({
    name : "movies",
    initialState,
    reducers:{
        removeSelectedMovieOrShow: (state) =>{
            state.selectedMovieOrShow = {}
        }
    },
    extraReducers:{
        [fetchAsyncMovies.pending]: () =>{
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]:(state,{payload}) =>{
            console.log("Fetched movies successfully...");
            return {...state, movies:payload}
        },
        [fetchAsyncShows.fulfilled] : (state,{payload}) =>{
            console.log("Fetched Shows successfully...")
            return {...state,shows:payload}
        },
        [fetchAsyncMovieOrShowDetail.fulfilled] : (state,{payload})=>{
            console.log("Fetched detail successfully");
            return {...state, selectedMovieOrShow:payload}
        },
        [fetchAsyncMovies.rejected] : () =>{
            console.log("Rejected");
        },
        [fetchAsyncMovieOrShowDetail.pending] : ()=>{
            console.log("Pending...");
        }
    }
})

export const {removeSelectedMovieOrShow}  = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;