import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function MovieDetailCard({ detail = {}, onClickFavorite }) {
  const { poster_url, title_en, title_th, release_date, genre, synopsis_th, isFavorite } = detail;

  const renderTitle = (
    <Typography
      color="inherit"
      variant="h3"
      underline="hover"
      sx={{
        overflow: 'hidden',
        WebkitLineClamp: 2,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
      }}
    >
      {`${title_th} (${title_en})`}
    </Typography>
  );

  const renderInfo = (
    <Box display="flex" flexDirection="column">
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          color: (theme) => alpha(theme.palette.grey[800], 1),
        }}
      >
        {`${synopsis_th}`}
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1.5}
        sx={{
          mt: 3,
          color: 'text.disabled',
        }}
      >
        {genre.split('/').map((label, index) => (
          <Chip key={index} label={label} />
        ))}
      </Stack>
    </Box>
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
      }}
    />
  );

  const renderDate = (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mb: 2,
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          opacity: 0.5,
        }}
      >
        {fDate(release_date)}
      </Typography>
      <Iconify
        width={40}
        icon="material-symbols:favorite"
        sx={{ color: isFavorite ? '#ff5555' : 'gray', cursor: 'pointer' }}
        onClick={onClickFavorite}
      />
    </Box>
  );

  return (
    <Grid xs={12}>
      <Card>
        <Box
          sx={{
            height: 330,
          }}
        >
          {renderCover}
        </Box>

        <Box
          sx={{
            p: (theme) => theme.spacing(4, 3, 3, 3),
            width: 1,
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

MovieDetailCard.propTypes = {
  detail: PropTypes.object.isRequired,
  onClickFavorite: PropTypes.func,
};
