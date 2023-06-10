type QueryParams = {
  [key: string]: any;
};

export const buildQueryString = (params: QueryParams): string  => {
  return Object.entries(params)
    .filter(([_, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
};
