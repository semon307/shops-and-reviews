import { Card, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { formatDate } from '../utils/format-date';
import { Color } from './ui/color';
import { Rating } from './rating';

type ReviewCardProps = {
  mark: number;
  comment: string;
  creationDate: string;
  backgroundColor?: string;
};

export const ReviewCard: FC<ReviewCardProps> = (props) => {
  return (
    <Card sx={{ backgroundColor: props?.backgroundColor || Color.BASE_WHITE, padding: 2 }}>
      <Stack spacing={2}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography>{formatDate(props.creationDate)}</Typography>
          <Rating rating={props.mark}/>
        </Stack>
        <Typography>{props.comment}</Typography>
      </Stack>
    </Card>
  );
};
