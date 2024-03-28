import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from 'src/api/movies';
import { update } from 'src/redux/reducer/movies';

export default function useMovies() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.value);

  useEffect(() => {
    if (dispatch && movies.length === 0) {
      const fetchMovies = async () => {
        setLoading(true);
        const { data } = await getMovies();
        dispatch(update(data));
        setLoading(false);
        console.log(data, 'movies');
      };
      console.log('start fetch movies');
      fetchMovies();
    }
  }, [dispatch, movies.length]);

  return { movies, loading };
}
