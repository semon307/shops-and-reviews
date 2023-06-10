import { SortOrder } from './common/sort-order';

export const sortArrayByField = <T>(arr: T[], field: keyof T, sortOrder: SortOrder): T[] => {
  const sortedArray = [...arr];

  sortedArray.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      if (sortOrder === 'ascending') {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    }

    return 0;
  });

  return sortedArray;
};
