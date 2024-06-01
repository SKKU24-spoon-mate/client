import { Sex } from '@interfaces/apis/login';

export interface RegisteredComponent {
  userId: string;
  menu: Menu;
  userImage: string;
  deadline: Deadline;
  isAge: boolean;
  age: number;
  comment: string;
  sex: Sex;
  distance: number | null;
  userName: string;
}

export type Menu = 'kor' | 'jpn' | 'chn' | 'west' | 'others';

export type Deadline = 5 | 10 | 15 | 20;

export type RegisteredComponents = Array<RegisteredComponent>;

//////////
export interface AlarmComponent {
  appliedUserName: string;
  appliedUserId: number;
  type: string; // apply or admin
}

export type AlarmComponents = Array<AlarmComponent>;
