import { Stack, Card, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AppNotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => navigate('/');

  return (
    <Card sx={{ padding: 20 }}>
      <Stack spacing={2}>
        <Typography>Oops! Not Found</Typography>
        <Button fullWidth onClick={handleButtonClick}>Go to main page</Button>
      </Stack>
    </Card>
  );
};
