import { atom } from 'recoil';

export interface userState {
  token: string;
  userId: string;
}

export const userStateAtom = atom<userState>({
  key: 'userStateAtom',
  default: { token: '', userId: '' },
});
