export interface UserEntity {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface ResUserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
