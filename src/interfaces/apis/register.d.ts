import { Deadline, Menu } from '@interfaces/components';

export interface MatchRegister {
  menu: Menu;
  deadline: Deadline;
  isAge: boolean;
  comment: string;
  userId: string; // 등록한 사람의 고유 id
  userName: string; // 등록한 사람의 nickname
}
