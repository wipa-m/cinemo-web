import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { getMovies } from 'src/api/movies';
import { update } from 'src/redux/reducer/movies';

import MovieCard from '../movie-card';

// ----------------------------------------------------------------------

export default function MovieFinderView() {
  const router = useRouter();
  const movies = useSelector((state) => state.movies.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await getMovies();
      dispatch(update(data));
    };

    fetchMovies();
  }, [dispatch]);

  const onClickMovie = (id) => {
    router.push(`/movie-detail/${id}`);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Movie Finder</Typography>
      </Stack>

      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            detail={movie}
            index={index}
            onClick={() => onClickMovie(movie.id)}
          />
        ))}
      </Grid>
    </Container>
  );
}
