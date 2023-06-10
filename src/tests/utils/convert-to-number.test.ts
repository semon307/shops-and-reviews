import { convertToNumber } from '../../utils/convert-to-number';

describe('convertToNumber', () => {
  test('should convert a string to a number', () => {
    const str = '123.45';

    const result = convertToNumber(str);

    expect(result).toBe(123.45);
    expect(typeof result).toBe('number');
  });

  test('should handle trailing decimal zeros', () => {
    const str = '42.000';

    const result = convertToNumber(str);

    expect(result).toBe(42);
  });

  test('should handle empty string', () => {
    const str = '';

    const result = convertToNumber(str);

    expect(result).toBe(NaN);
  });

  test('should handle non-numeric string', () => {
    const str = 'abc123';

    const result = convertToNumber(str);

    expect(result).toBe(NaN);
  });
});
