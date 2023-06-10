import { Dispatch } from 'redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buildQueryString } from '../utils/build-query-string';
import { Shop } from './types/shop/shop';
import { shopsApi } from '../api/shops-api';
import { ShopsFilters } from './types/shop/shop-filters';

export type ShopsState = {
  shopsRequests: {
    [searchQuery: string]: Array<Shop>;
  };
  totalPageCount: {
    [searchTerm: string]: number;
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: ShopsState = {
  shopsRequests: {},
  totalPageCount: {},
  isLoading: false,
  error: null,
};
const slice = createSlice({
  name: 'shopsReducer',
  initialState: initialState,
  reducers: {
    setShopsAC(
      state,
      action: PayloadAction<{ shops: Array<Shop>; totalPageCount: number; filters: ShopsFilters; searchQuery: string; }>
    ) {
      const { shops, totalPageCount, filters, searchQuery } = action.payload;
      state.shopsRequests = {
        ...state.shopsRequests,
        [searchQuery]: shops,
      };
      state.totalPageCount = {
        [String(filters.searchTerm)]: totalPageCount,
      };
    },
    setLoadingAC(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorAC(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  }
});

export const shopsReducer = slice.reducer;
export const setShopsAC = slice.actions.setShopsAC;
export const setLoadingAC = slice.actions.setLoadingAC;
export const setErrorAC = slice.actions.setErrorAC;


export const setShopsTC = (filters: ShopsFilters) => (dispatch: Dispatch) => {
  dispatch(setErrorAC(null));
  dispatch(setLoadingAC(true));
  const searchQuery = buildQueryString(filters);
  shopsApi.getShops(searchQuery)
    .then((res) => {
      dispatch(setShopsAC({
        shops: res?.data?.shops,
        filters,
        searchQuery,
        totalPageCount: res?.data?.metaData?.totalPageCount
      }));
    })
    .catch((error) => {
      dispatch({ type: 'shops/error', payload: error.message });
      dispatch(setErrorAC('Something went wrong:('));
    })
    .finally(() => {
      dispatch(setLoadingAC(false));
    });
};
