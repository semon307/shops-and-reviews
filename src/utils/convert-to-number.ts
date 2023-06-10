export const convertToNumber = (str: string): number => {
  return parseFloat(str.replace(/\.0+$/, ''));
};
