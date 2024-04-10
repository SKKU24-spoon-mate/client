import { atom } from 'recoil';

// interface & type
export interface keyword {
  keyword: string;
}

// atoms
export const keywordAtom = atom<keyword>({
  key: 'keywordAtom',
  default: { keyword: '' },
});
