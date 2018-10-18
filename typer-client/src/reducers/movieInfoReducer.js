import * as types from '../actions/actionTypes';

const initialState = {
  data: {},
  isLoading: false,
  error: false,
  errorMessage: '',
};

const movieInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_MOVIE_INFO_START:
      return { ...state, ...action.payload };
    case types.LOAD_MOVIE_INFO_SUCCESS:
      return { ...state, ...action.payload };
    case types.LOAD_MOVIE_INFO_FAILED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default movieInfoReducer;
