import { Criteria } from '../criteria';
import { Reviewer } from '../reviewer';

export type ReviewRaw = {
  changeDate: string;
  comment?: string;
  confirmationDate: string;
  creationDate: string;
  criteria: Criteria[];
  mark: string;
  markDescription: string;
  UID: string;
  reviewer?: Reviewer;
  orderDate: string;
};
