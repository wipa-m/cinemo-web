import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { CINEMO_LOGIN_TOKEN } from 'src/utils/staticVariables';

import { bgBlur } from 'src/theme/css';
import { resetUsers } from 'src/redux/reducer/users';
import { resetMovies } from 'src/redux/reducer/movies';

import { NAV, HEADER } from './config-layout';

export default function Header({ onOpenNav }) {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const lgUp = useResponsive('up', 'lg');

  const onClickLogout = () => {
    dispatch(resetMovies());
    dispatch(resetUsers());

    localStorage.setItem(CINEMO_LOGIN_TOKEN, null);
    router.push('/login');
  };

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Box display="flex" justifyContent="flex-end" sx={{ width: 1 }}>
          <Button variant="contained" onClick={onClickLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
