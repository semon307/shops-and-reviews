import { mapReviewsRaw } from '../../redux/mappers/map-reviews-raw';
import { Review } from '../../redux/types/review/review';
import { ReviewRaw } from '../../redux/types/review/review-raw';

const rawReview = {
  changeDate: '2022-01-01',
  comment: 'Great product!',
  confirmationDate: '2022-01-02',
  creationDate: '2022-01-01',
  criteria: [],
  mark: '5',
  markDescription: 'Excellent',
  UID: '123',
  reviewer: {
    profile: {
      firstname: 'John',
      lastname: 'Doe',
      city: 'New York',
      url: 'https://example.com/profile',
    },
  },
  orderDate: '2021-12-31',
};

describe('mapReviewsRaw', () => {
  test('should add relevanceScroe to review', () => {
    const rawReviews: Array<ReviewRaw> = [rawReview];

    const expectedReviews: Array<Review> = [
      {
        ...rawReview,
        relevanceScore: 63,
      },
    ];

    const mappedReviews = mapReviewsRaw(rawReviews);

    expect(mappedReviews[0].relevanceScore).toEqual(expectedReviews[0].relevanceScore);
  });
});
