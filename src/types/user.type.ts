export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface GetOneUserResponse {
  user: User;
}

export interface GetMeResponse {
  user: User;
}
