import { atom } from 'recoil';

import { RegisteredComponents } from '@interfaces';

export const isMobileAtom = atom<boolean>({
  key: 'isMobileAtom',
  default: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
});

export const registeredEntitiesAtom = atom<RegisteredComponents>({
  key: 'registeredEntitiesAtom',
  default: [],
});
