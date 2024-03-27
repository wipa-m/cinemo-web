import { Helmet } from 'react-helmet-async';

import { MovieFinder as MovieFinderComponent } from 'src/sections/movie-finder/view';

// ----------------------------------------------------------------------

export default function MovieFinder() {
  return (
    <>
      <Helmet>
        <title> Movie Finder </title>
      </Helmet>

      <MovieFinderComponent />
    </>
  );
}
