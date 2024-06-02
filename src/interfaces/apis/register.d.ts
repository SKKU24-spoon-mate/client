import { Deadline, Menu } from '@interfaces/components';

export interface MatchRegister {
  menu: Menu;
  deadline: Deadline;
  isAge: boolean;
  comment: string;
  userId: string; // 등록한 사람의 고유 id
  userName: string; // 등록한 사람의 nickname
}

export interface ConfirmRes {
  reqUserImage: string; // 상대방 이미지 url
  reqUserId: string; // 상대방 아이디
  reqUserNickname: string; // 상대방 nickname
}
