export interface CreateUserDTO {
  username: string;
  password: string;
}
export interface UserData {
  id: number;
  username: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}
