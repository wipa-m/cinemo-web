export const getMovies = async () => {
  try {
    const response = await fetch('https://www.majorcineplex.com/apis/get_movie_avaiable');
    const movies = await response.json();
    return { status: response.status, data: movies.movies };
  } catch (error) {
    return { status: error.response.status };
  }
};
