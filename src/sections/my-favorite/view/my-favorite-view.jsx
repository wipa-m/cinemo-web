import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';
import useMovies from 'src/routes/hooks/useMovies';

import MovieCard from 'src/sections/movie-finder/movie-card';

// ----------------------------------------------------------------------

export default function MyFavoriteView() {
  const router = useRouter();
  const { movies, loading } = useMovies();

  const onClickMovie = (id) => {
    router.push(`/movie-detail/${id}`);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">My Favorite</Typography>
      </Stack>

      {loading ? (
        'Loading...'
      ) : (
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
      )}
    </Container>
  );
}
