import { SortOrder } from '../../utils/common/sort-order';
import { sortArrayByCreationDate } from '../../utils/sort-array-by-creation-date';

describe('sortArrayByCreationDate', () => {
  const array = [
    { creationDate: '2022-01-01' },
    { creationDate: '2023-03-15' },
    { creationDate: '2021-08-10' },
  ];

  test('should sort array in ascending order', () => {
    const sortOrder = SortOrder.ASCENDING;

    const result = sortArrayByCreationDate(array, sortOrder);

    expect(result).toEqual([
      { creationDate: '2021-08-10' },
      { creationDate: '2022-01-01' },
      { creationDate: '2023-03-15' },
    ]);
  });

  test('should sort array in descending order', () => {
    const sortOrder = SortOrder.DESCENDING;

    const result = sortArrayByCreationDate(array, sortOrder);

    expect(result).toEqual([
      { creationDate: '2023-03-15' },
      { creationDate: '2022-01-01' },
      { creationDate: '2021-08-10' },
    ]);
  });
});
