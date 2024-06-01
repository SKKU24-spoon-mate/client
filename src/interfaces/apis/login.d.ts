export type Sex = 'Male' | 'Female';

export interface UserRegister {
  id: string;
  pw: string;
  nickname: string;
  sex: Sex; // Possible values: "Male", "Female", "Other"
  age: number;
}

export interface UserLogin {
  id: string;
  pw: string;
}

export interface UserLoginRes {
  message: string;
  token: string;
  userId: string;
}
