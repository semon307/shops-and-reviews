import React, { FC } from 'react';
import { Star } from './icons/star';
import { Color } from './ui/color';
import { Stack } from '@mui/material';

type RatingProps = {
  rating: number;
};
export const Rating: FC<RatingProps> = (props) => {
  const filledStars = Math.round(props.rating);
  const emptyStars = 5 - filledStars;

  return (
    <Stack spacing={0.5} direction={'row'}>
      {[...Array(filledStars)].map((_, index) => (
        <Star key={index} backgroundColor={Color.BASE_YELLOW}/>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={index} backgroundColor={Color.BASE_GRAY}/>
      ))}
    </Stack>
  );
};
