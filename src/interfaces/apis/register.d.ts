import { Deadline, Menu } from '@interfaces/components';

export interface MatchRegister {
  menu: Menu;
  deadline: Deadline;
  isAge: boolean;
  comment: string;
  userId: number;
}
