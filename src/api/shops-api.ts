import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://shop-search-api.trustedshops.com/',
});

export const shopsApi = {
  getShops(queryString: string) {
    return instance.get(`shopsearch?${queryString}`);
  },
};
