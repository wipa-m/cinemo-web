import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';
// import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
// import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function MovieCard({ detail, index, onClick, showFavorite = false }) {
  const { poster_url, title_en, title_th, release_date, genre } = detail;

  const latestPostLarge = index === 0;

  const latestPost = index === 1 || index === 2;

  // const renderAvatar = (
  //   <Avatar
  //     alt={author.name}
  //     src={author.avatarUrl}
  //     sx={{
  //       zIndex: 9,
  //       width: 32,
  //       height: 32,
  //       position: 'absolute',
  //       left: (theme) => theme.spacing(3),
  //       bottom: (theme) => theme.spacing(-2),
  //       ...((latestPostLarge || latestPost) && {
  //         zIndex: 9,
  //         top: 24,
  //         left: 24,
  //         width: 40,
  //         height: 40,
  //       }),
  //     }}
  //   />
  // );

  const renderTitle = (
    <Link
      color="inherit"
      variant="subtitle1"
      underline="hover"
      onClick={onClick}
      sx={{
        height: 50,
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        cursor: 'pointer',
        WebkitBoxOrient: 'vertical',
        ...(latestPostLarge && { typography: 'h5', height: 60 }),
        ...((latestPostLarge || latestPost) && {
          color: 'common.white',
        }),
      }}
    >
      {`${title_th} (${title_en})`}
    </Link>
  );

  const renderInfo = (
    <Typography
      variant="caption"
      sx={{
        color: latestPostLarge || latestPost ? 'common.white' : 'gray',
      }}
    >
      {genre}
    </Typography>
  );

  const renderCover = (
    <Box
      component="img"
      alt={title_en}
      src={poster_url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Box display="flex" justifyContent="space-between">
      <Typography
        variant="caption"
        component="div"
        sx={{
          mb: 2,
          color: 'text.disabled',
          ...((latestPostLarge || latestPost) && {
            opacity: 0.48,
            color: 'common.white',
          }),
        }}
      >
        {fDate(release_date)}
      </Typography>
      {showFavorite && (
        <Iconify width={16} icon="material-symbols:favorite" sx={{ color: '#ff5555' }} />
      )}
    </Box>
  );

  // const renderShape = (
  //   <SvgColor
  //     color="paper"
  //     src="/assets/icons/shape-avatar.svg"
  //     sx={{
  //       width: 80,
  //       height: 36,
  //       zIndex: 9,
  //       bottom: -15,
  //       position: 'absolute',
  //       color: 'background.paper',
  //       ...((latestPostLarge || latestPost) && { display: 'none' }),
  //     }}
  //   />
  // );

  return (
    <Grid xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ height: '100%' }}>
        <Box
          sx={{
            position: 'relative',
            pt: 'calc(100% * 3 / 4)',
            height: 330,

            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          {/* {renderShape} */}

          {/* {renderAvatar} */}

          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            ...((latestPostLarge || latestPost) && {
              width: 1,
              bottom: 0,
              position: 'absolute',
            }),
          }}
        >
          {renderDate}

          {renderTitle}

          {renderInfo}
        </Box>
      </Card>
    </Grid>
  );
}

MovieCard.propTypes = {
  detail: PropTypes.object.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func,
  showFavorite: PropTypes.bool,
};
