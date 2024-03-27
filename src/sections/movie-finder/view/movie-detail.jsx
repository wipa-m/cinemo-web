import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { useRouter } from 'src/routes/hooks';

import { toggleFavorite } from 'src/redux/reducer/movies';

// import Iconify from 'src/components/iconify';

import MovieDetailCard from '../movie-detail-card';

// ----------------------------------------------------------------------

export default function MovieDetailView() {
  const { id } = useParams();
  // const router = useRouter();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.value);
  const movieDetail = movies.find((movie) => movie.id === Number(id));

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const { data } = await getMovies();
  //     dispatch(update(data));
  //   };
  //   console.log('fetch');
  //   fetchMovies();
  // }, [dispatch]);

  // console.log(movies, 'movies');
  // console.log(movieDetail, 'movieDetail');

  const onClickFavorite = useCallback(
    (movieId) => {
      dispatch(toggleFavorite({ id: movieId }));
    },
    [dispatch]
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {/* <Link
            variant="h4"
            color="gray"
            underline="hover"
            onClick={() => router.push('/movie-finder')}
            sx={{
              cursor: 'pointer',
            }}
          >
            Movie Finder
          </Link>
          <Iconify width={30} icon="ic:round-navigate-next" sx={{ color: 'gray' }} /> */}
          <Typography variant="h4">Movie Detail</Typography>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {movieDetail && (
          <MovieDetailCard
            detail={movieDetail}
            onClickFavorite={() => onClickFavorite(Number(id))}
          />
        )}
      </Grid>
    </Container>
  );
}
