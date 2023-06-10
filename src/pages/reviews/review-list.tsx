import { Stack, CircularProgress, Tabs, Tab, Card, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffectOnce } from '../../common/hooks/use-effect-once';
import { ReviewCard } from '../../components/review-card';
import { Color } from '../../components/ui/color';
import { ReviewsState, setReviewsTC, setReviewsAC } from '../../redux/reviews-reducer';
import { AppRootStateType, useTypedDispatch } from '../../redux/store';
import { SortOrder } from '../../utils/common/sort-order';
import { convertToNumber } from '../../utils/convert-to-number';
import { sortArrayByCreationDate } from '../../utils/sort-array-by-creation-date';
import { sortArrayByField } from '../../utils/sort-array-by-field';

export const ReviewList: FC = () => {
  const params = useParams<{ tsId: string; }>();

  const reviewsState = useSelector<AppRootStateType, ReviewsState>(
    (state) => state.reviews
  );
  const [tabsValue, setTabsValue] = useState<SortOrder | 'mostRelevant'>(SortOrder.DESCENDING);

  const dispatch = useTypedDispatch();

  useEffectOnce(() => {
    if (!reviewsState[params.tsId as string]) {
      dispatch(setReviewsTC(params.tsId as string));
    }
  });

  const handleChangeTab = (event: React.SyntheticEvent, value: SortOrder | 'mostRelevant') => {
    event.preventDefault();
    if (value !== tabsValue) {
      if (value !== 'mostRelevant') {
        dispatch(setReviewsAC({
          reviews: sortArrayByCreationDate(reviewsState?.[params.tsId as string]?.reviews, value),
          tsId: params.tsId as string
        }));
      } else {
        dispatch(setReviewsAC(
          {
            reviews: sortArrayByField(
              reviewsState?.[params.tsId as string]?.reviews, 'relevanceScore', SortOrder.DESCENDING
            ),
            tsId: params.tsId as string
          }
        ));
      }
    }
    setTabsValue(value);
  };

  if (reviewsState[params.tsId as string]?.isLoading) return <CircularProgress/>;
  if (reviewsState[params.tsId as string]?.error) return <div>{reviewsState[params.tsId as string].error}</div>;

  return (
    <Stack>
      <Stack spacing={2}>
        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <Typography>Sort by:</Typography>
          <Tabs value={tabsValue} onChange={handleChangeTab}>
            <Tab value={SortOrder.DESCENDING} label={'Review date descending'}/>
            <Tab value={SortOrder.ASCENDING} label={'Review date ascending'}/>
            <Tab value={'mostRelevant'} label={'Relevance'}/>
          </Tabs>
        </Card>
        {reviewsState?.[params.tsId as string]?.reviews.map((review, index) => {
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
      </Stack>
    </Stack>
  );
};
