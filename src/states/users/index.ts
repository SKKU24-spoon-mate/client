import { atom } from 'recoil';

import { Sex } from '@interfaces';

export interface userState {
  token: string;
  userId: string;
  userName: string;
  userAge: number;
  userSex: Sex; // Female 혹은 Male
}

export const userStateAtom = atom<userState>({
  key: 'userStateAtom',
  default: { token: '', userId: '', userName: '', userAge: 0, userSex: 'Male' },
});
