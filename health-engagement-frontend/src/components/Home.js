import React from 'react';
import { Container, Typography } from '@mui/material';

function Home() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Health Support Platform
      </Typography>
      <Typography variant="body1">
        This platform is designed to provide support for individuals with chronic conditions.
      </Typography>
    </Container>
  );
}

export default Home;