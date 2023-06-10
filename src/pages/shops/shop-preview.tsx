import { CircularProgress, Stack, Button } from '@mui/material';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../../common/hooks/use-effect-once';
import { ReviewCard } from '../../components/review-card';
import { Color } from '../../components/ui/color';
import { ReviewsState, setReviewsTC } from '../../redux/reviews-reducer';
import { AppRootStateType, useTypedDispatch } from '../../redux/store';
import { convertToNumber } from '../../utils/convert-to-number';

type ShopPreviewProps = {
  tsId: string;
};

export const ShopPreview: FC<ShopPreviewProps> = (props) => {
  const reviewsState = useSelector<AppRootStateType, ReviewsState>(
    (state) => state.reviews
  );

  const navigate = useNavigate();

  const dispatch = useTypedDispatch();

  useEffectOnce(() => {
    if(!reviewsState[props.tsId]){
      dispatch(setReviewsTC(props.tsId));
    }
  });

  if (reviewsState[props.tsId]?.isLoading) return <CircularProgress/>;
  if (reviewsState[props.tsId]?.error) return <div>{reviewsState[props.tsId].error}</div>;

  return (
    <Stack spacing={2}>
      {reviewsState?.[props.tsId]?.reviews.slice(0, 3).map((review, index) => {
        return (
          <ReviewCard
            key={review.UID}
            mark={convertToNumber(review.mark)}
            comment={review.comment || review.markDescription}
            creationDate={review.creationDate}
            backgroundColor={index % 2 === 1 ? Color.LIGHT_GRAY : Color.BASE_WHITE}
          />
        );
      })}
      <Button onClick={() => navigate(`/reviews/${props.tsId}`)}>view more!</Button>
    </Stack>
  );
};
