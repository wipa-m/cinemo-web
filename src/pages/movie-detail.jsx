import { Helmet } from 'react-helmet-async';

import { MovieDetail as MovieDetailComponent } from 'src/sections/movie-finder/view';

// ----------------------------------------------------------------------

export default function MovieDetail() {
  return (
    <>
      <Helmet>
        <title> Movie Detail </title>
      </Helmet>

      <MovieDetailComponent />
    </>
  );
}
