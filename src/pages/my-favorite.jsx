import { Helmet } from 'react-helmet-async';

import { MyFavorite as MyFavoriteComponent } from 'src/sections/my-favorite/view';

// ----------------------------------------------------------------------

export default function MyFavorite() {
  return (
    <>
      <Helmet>
        <title> My Favorite </title>
      </Helmet>

      <MyFavoriteComponent />
    </>
  );
}
