import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { CINEMO_USERS, CINEMO_LOGIN_TOKEN } from 'src/utils/staticVariables';

import { bgGradient } from 'src/theme/css';
import { getDataLocalStorage } from 'src/utils';
import { initial } from 'src/redux/reducer/users';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  const dispatch = useDispatch();

  const [formSignIn, setFormSignIn] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickLogin = () => {
    console.log('form', formSignIn);
    const currentUser = { username: formSignIn.username };
    const { userList } = getDataLocalStorage();

    const oldUser = userList.find((user) => user.username === formSignIn.username);

    if (oldUser) {
      if (oldUser.password !== formSignIn.password) {
        alert('Wrong password');
        return;
      }
    }

    const newUsers = oldUser ? userList : [...userList, formSignIn];
    localStorage.setItem(CINEMO_USERS, JSON.stringify(newUsers));
    localStorage.setItem(CINEMO_LOGIN_TOKEN, formSignIn.username);
    dispatch(initial({ all: newUsers, currentUser }));

    setFormSignIn({
      username: '',
      password: '',
    });
    router.push('/');
  };

  const onChangeForm = (name, value) => {
    setFormSignIn((prevForm) => ({
      ...prevForm,
      [name]: value.trim(),
    }));
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          value={formSignIn.username}
          onChange={(e) => onChangeForm('username', e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formSignIn.password}
          onChange={(e) => onChangeForm('password', e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClickLogin}
        sx={{ mt: 4 }}
        disabled={formSignIn.username === '' || formSignIn.password === ''}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 5 }}>
            Sign in to Cinemo
          </Typography>
          {/* 
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
