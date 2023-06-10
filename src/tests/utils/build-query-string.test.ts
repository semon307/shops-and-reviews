import { buildQueryString } from '../../utils/build-query-string';

describe('buildQueryString', () => {
  test('should build a valid query string', () => {
    const params = {
      searchTerm: 'test',
      page: 1,
      category: 'books',
      sort: 'asc',
      filter: null,
    };

    const queryString = buildQueryString(params);

    expect(queryString).toBe('searchTerm=test&page=1&category=books&sort=asc');
  });

  test('should handle empty params', () => {
    const params = {};

    const queryString = buildQueryString(params);

    expect(queryString).toBe('');
  });

  test('should handle params with empty or null values', () => {
    const params = {
      searchTerm: '',
      page: null,
      category: 'books',
      sort: '',
    };

    const queryString = buildQueryString(params);

    expect(queryString).toBe('category=books');
  });

  test('should encode special characters in values', () => {
    const params = {
      searchTerm: 'test+value',
      page: 1,
      category: 'books & movies',
    };

    const queryString = buildQueryString(params);

    expect(queryString).toBe('searchTerm=test%2Bvalue&page=1&category=books%20%26%20movies');
  });
});
