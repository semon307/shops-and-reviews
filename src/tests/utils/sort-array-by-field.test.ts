import { SortOrder } from '../../utils/common/sort-order';
import { sortArrayByField } from '../../utils/sort-array-by-field';

describe('sortArrayByField', () => {
  const array = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Alice', age: 30 },
    { id: 3, name: 'Bob', age: 20 },
  ];

  test('should sort array in ascending order by numeric field', () => {
    const field = 'age';
    const sortOrder = SortOrder.ASCENDING;

    const result = sortArrayByField(array, field, sortOrder);

    expect(result).toEqual([
      { id: 3, name: 'Bob', age: 20 },
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Alice', age: 30 },
    ]);
  });

  test('should sort array in descending order by numeric field', () => {
    const field = 'age';
    const sortOrder = SortOrder.DESCENDING;

    const result = sortArrayByField(array, field, sortOrder);

    expect(result).toEqual([
      { id: 2, name: 'Alice', age: 30 },
      { id: 1, name: 'John', age: 25 },
      { id: 3, name: 'Bob', age: 20 },
    ]);
  });

  test('should return array as is for non-numeric field', () => {
    const field = 'name';
    const sortOrder = SortOrder.ASCENDING;

    const result = sortArrayByField(array, field, sortOrder);

    expect(result).toEqual(array);
  });
});
