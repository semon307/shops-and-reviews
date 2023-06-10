import { Review } from '../types/review/review';
import { ReviewRaw } from '../types/review/review-raw';

const calculateRelevanceScore = (review: ReviewRaw): number => {
  let score = 0;

  if (review.comment) {
    const commentLength = review.comment.replace(/[\n\s]/g, '').length;
    score += Math.min(commentLength, 100);
  }

  if (review.reviewer) {
    const { firstname, lastname } = review.reviewer.profile;
    if (firstname && lastname) {
      score += 50;
    } else if ((firstname && firstname.length === 1) || (lastname && lastname.length === 1)) {
      score += 25;
    }
  }

  return score;
};

export const mapReviewsRaw = (reviews: ReviewRaw[]): Review[] => {
  return reviews.map((review) => ({
    ...review,
    relevanceScore: calculateRelevanceScore(review)
  }));
};
