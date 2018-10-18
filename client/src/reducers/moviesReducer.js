import * as types from '../actions/actionTypes';

const initialState = {
  now_playing: {
    isLoading: false,
    error: false,
  },
  upcoming: {
    isLoading: false,
    error: false,
  },
  popular: {
    isLoading: false,
    error: false,
  },
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_MOVIES_START:
      return { ...state, ...action.payload };
    case types.LOAD_MOVIES_SUCCESS:
      return { ...state, ...action.payload };
    case types.LOAD_MOVIES_FAILED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default moviesReducer;
