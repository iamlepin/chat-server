const MovieApi = {
  get(query, param) {
    const apiKey = 'api_key=2be7d8ea984bb55c6cefc8e86802870c';
    return fetch(`https://api.themoviedb.org/3/movie/${query}?${apiKey}&${param}`, {
      method: 'GET',
    })
      .then(response => response.json());
      // .catch(error => error);
  },
};

export default MovieApi;
