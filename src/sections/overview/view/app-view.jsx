import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// ----------------------------------------------------------------------

export default function AppView() {
  const userInfo = useSelector((state) => state.users.currentUser);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {`Hi ${userInfo?.username}, Welcome back 👋`}
      </Typography>
    </Container>
  );
}
