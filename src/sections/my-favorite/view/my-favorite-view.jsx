import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { getMovies } from 'src/api/movies';
import { update } from 'src/redux/reducer/movies';

import MovieCard from 'src/sections/movie-finder/movie-card';

// ----------------------------------------------------------------------

export default function MyFavoriteView() {
  const router = useRouter();
  const movies = useSelector((state) => state.movies.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await getMovies();
      dispatch(update(data));
    };

    if (movies.length === 0) {
      fetchMovies();
    }
  }, [dispatch, movies.length]);

  const onClickMovie = (id) => {
    router.push(`/movie-detail/${id}`);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">My Favorite</Typography>
      </Stack>

      <Grid container spacing={3}>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            detail={movie}
            index={index}
            onClick={() => onClickMovie(movie.id)}
            showFavorite={movie.isFavorite}
          />
        ))}
      </Grid>
    </Container>
  );
}
