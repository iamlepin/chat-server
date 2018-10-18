import * as types from './actionTypes';
import MovieApi from '../api/movieApi';

const loadMovieInfoStart = () => ({
  type: types.LOAD_MOVIE_INFO_START,
  payload: {
    isLoading: true,
  },
});

const loadMovieInfoSuccess = movies => ({
  type: types.LOAD_MOVIE_INFO_SUCCESS,
  payload: {
    data: movies,
    isLoading: false,
  },
});

const loadMovieInfoFailed = (error, errorMessage) => ({
  type: types.LOAD_MOVIE_INFO_FAILED,
  payload: {
    error,
    errorMessage,
    isLoading: false,
  },
});

export const loadMovieInfo = (query, param) => dispatch => {
  dispatch(loadMovieInfoStart());
  return MovieApi.get(query, param)
    .then(data => {
      if (data.success === false) {
        console.log('data: ', data);
        dispatch(loadMovieInfoFailed(true, data.status_message));
      }
      dispatch(loadMovieInfoSuccess(data));
    })
    .catch(error => {
      console.log('error: ', error);
      throw new Error(error);
    });
};
