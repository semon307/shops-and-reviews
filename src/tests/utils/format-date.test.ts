import { formatDate } from '../../utils/format-date';

describe('formatDate', () => {
  test('should format date string in en-GB locale', () => {
    const dateString = '2023-06-09';

    const result = formatDate(dateString);

    expect(result).toBe('09.06.2023');
  });

  test('should handle invalid date string', () => {
    const dateString = 'invalid-date';

    const result = formatDate(dateString);

    expect(result).toBe('Invalid Date');
  });

  test('should handle empty string', () => {
    const dateString = '';

    const result = formatDate(dateString);

    expect(result).toBe('Invalid Date');
  });
});
