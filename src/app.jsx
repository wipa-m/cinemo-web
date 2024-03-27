/* eslint-disable perfectionist/sort-imports */
import { useDispatch } from 'react-redux';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { initial } from 'src/redux/reducer/users';
import { useEffect } from 'react';
import { useRouter } from './routes/hooks';
import { CINEMO_USERS, CINEMO_LOGIN_TOKEN } from './utils/staticVariables';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const usersLocal = localStorage.getItem(CINEMO_USERS) || [];
    const token = localStorage.getItem(CINEMO_LOGIN_TOKEN);
    const currentUser = { username: token };

    if (usersLocal?.length >= 0) {
      const userList = JSON.parse(usersLocal);

      const match = userList.find((user) => user.username === token);
      if (match) {
        dispatch(initial({ all: userList, currentUser }));
      }
    } else {
      localStorage.setItem(CINEMO_LOGIN_TOKEN, null);
      router.push('/login');
    }
  }, [dispatch, router]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
