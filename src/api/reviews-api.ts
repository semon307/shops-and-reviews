import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.trustedshops.com/rest/internal/v2/shops/',
});

export const reviewsApi = {
  getReviews(tsId: string) {
    return instance.get(`${tsId}/reviews.json`);
  },
};
