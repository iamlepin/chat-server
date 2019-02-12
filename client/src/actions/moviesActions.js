import * as types from './actionTypes';
import MovieApi from '../api/movieApi';

const loadMoviesStart = (query) => ({
  type: types.LOAD_MOVIES_START,
  payload: {
    [query]: {
      isLoading: true,
    },
  },
});

const loadMoviesSuccess = (data, query) => ({
  type: types.LOAD_MOVIES_SUCCESS,
  payload: {
    [query]: {
      ...data,
      isLoading: false,
      error: false,
    },
  },
});

const loadMoviesFailed = (data, query) => ({
  type: types.LOAD_MOVIES_FAILED,
  payload: {
    [query]: {
      ...data,
      error: true,
      isLoading: false,
    },
  },
});

export const loadMovies = (query, param) => dispatch => {
  dispatch(loadMoviesStart(query));
  return MovieApi.get(query, param)
    .then(data => {
      if (data.success === false) {
        console.log('data: ', data);
        dispatch(loadMoviesFailed(data, query));
      }
      dispatch(loadMoviesSuccess(data, query));
    })
    .catch(error => {
      console.log('error: ', error);
      throw new Error(error);
    });
};
