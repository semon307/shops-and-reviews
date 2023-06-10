import { shopsReducer, setShopsAC, setErrorAC, setLoadingAC, ShopsState } from '../../redux/shops-reducer';
import { Shop } from '../../redux/types/shop/shop';
import { buildQueryString } from '../../utils/build-query-string';

describe('shopsReducer', () => {
  let startState: ShopsState;

  beforeEach(() => {
    startState = {
      shopsRequests: {},
      totalPageCount: {},
      isLoading: false,
      error: null,
    };
  });

  test('should set shops and totalPageCount', () => {
    const shops: Array<Shop> = [];
    const totalPageCount = 0;
    const filters = { searchTerm: 'search', page: 1 };
    const searchQuery = buildQueryString(filters);

    const action = setShopsAC({shops, totalPageCount, filters, searchQuery});
    const endState = shopsReducer(startState, action);

    expect(endState.shopsRequests[searchQuery].length).toEqual(shops.length);
    expect(endState.totalPageCount[filters.searchTerm]).toEqual(totalPageCount);
  });

  test('should set isLoading to true', () => {
    const isLoading = true;
    const action = setLoadingAC(isLoading);
    const endState = shopsReducer(startState, action);

    expect(endState.isLoading).toBe(isLoading);
  });

  test('should set error to the provided value', () => {
    const error = 'Something went wrong';
    const action = setErrorAC(error);
    const endState = shopsReducer(startState, action);

    expect(endState.error).toEqual(error);
  });
});
