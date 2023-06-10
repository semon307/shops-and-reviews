import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { reviewsApi } from '../api/reviews-api';
import { SortOrder } from '../utils/common/sort-order';
import { sortArrayByCreationDate } from '../utils/sort-array-by-creation-date';
import { mapReviewsRaw } from './mappers/map-reviews-raw';
import { Review } from './types/review/review';

export type ReviewsState = {
  [tsId: string]: {
    reviews: Array<Review>;
    isLoading: boolean;
    error: string | null;
  };
};

const initialState: ReviewsState = {};
const slice = createSlice({
  name: 'ReviewsReducer',
  initialState: initialState,
  reducers: {
    setReviewsAC(state, action: PayloadAction<{ tsId: string; reviews: Array<Review>; }>) {
      state[action.payload.tsId] = {
        ...state[action.payload.tsId],
        reviews: action.payload.reviews
      };
    },
    setLoadingAC(state, action: PayloadAction<{ tsId: string; isLoading: boolean; }>) {
      state[action.payload.tsId] = {
        ...state[action.payload.tsId],
        isLoading: action.payload?.isLoading,
      };
    },
    setErrorAC(state, action: PayloadAction<{tsId: string; error: string | null;}>) {
      state[action.payload.tsId] = {
        ...state[action.payload.tsId],
        error: action.payload?.error,
      };
    },
  }
});

export const reviewsReducer = slice.reducer;
export const setReviewsAC = slice.actions.setReviewsAC;
export const setLoadingAC = slice.actions.setLoadingAC;
export const setErrorAC = slice.actions.setErrorAC;


export const setReviewsTC = (tsId: string) => (dispatch: Dispatch) => {
  dispatch(setLoadingAC({tsId, isLoading: true}));
  dispatch(setErrorAC({tsId, error: null}));
  reviewsApi.getReviews(tsId)
    .then((res) => {
      const mappedReviews = mapReviewsRaw(res.data.response.data?.shop?.reviews);
      dispatch(setReviewsAC(
        { reviews: sortArrayByCreationDate(mappedReviews, SortOrder.DESCENDING),
          tsId })
      );
    })
    .catch((error) => {
      dispatch({ type: 'reviews/error', payload: error.message });
      dispatch(setErrorAC({tsId, error: 'Something went wrong:('}));
    })
    .finally(() => {
      dispatch(setLoadingAC({tsId, isLoading: false}));
    });
};
