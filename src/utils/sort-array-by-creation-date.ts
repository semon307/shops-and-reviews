import { SortOrder } from './common/sort-order';

export const sortArrayByCreationDate = <T extends { creationDate: string; }>(arr: T[], sortOrder: SortOrder): T[] => {
  const sortedArray = [...arr];

  sortedArray.sort((a, b) => {
    const dateA = new Date(a.creationDate);
    const dateB = new Date(b.creationDate);

    if (sortOrder === SortOrder.ASCENDING) {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });

  return sortedArray;
};
