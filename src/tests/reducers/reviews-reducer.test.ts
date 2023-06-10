import { ReviewsState, setReviewsAC, reviewsReducer, setLoadingAC, setErrorAC } from '../../redux/reviews-reducer';
import { Review } from '../../redux/types/review/review';

describe('reviewsReducer', () => {
  let startState: ReviewsState;

  beforeEach(() => {
    startState = {};
  });

  test('should set reviews for the specified tsId', () => {
    const tsId = '123';
    const reviews: Array<Review> = [];

    const action = setReviewsAC({ tsId, reviews });
    const endState = reviewsReducer(startState, action);

    expect(endState[tsId].reviews.length).toEqual(reviews.length);
  });

  test('should set isLoading for the specified tsId', () => {
    const tsId = '123';
    const isLoading = true;

    const action = setLoadingAC({ tsId, isLoading });
    const endState = reviewsReducer(startState, action);

    expect(endState[tsId].isLoading).toBe(isLoading);
  });

  test('should set error for the specified tsId', () => {
    const tsId = '123';
    const error = 'Error message';

    const action = setErrorAC({ tsId, error });
    const endState = reviewsReducer(startState, action);

    expect(endState[tsId].error).toEqual(error);
  });
});
