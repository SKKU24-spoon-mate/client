import { atom } from 'recoil';

export const isMobileAtom = atom<boolean>({
  key: 'isMobileAtom',
  default: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
});
