export interface signupDTO {
  name: string;
  email: string;
  password: string;
}

export interface signupResponse {
  message: string;
  accessToken: string;
}

export interface loginDTO {
  email: string;
  password: string;
}

export interface loginResponse {
  message: string;
  accessToken: string;
}

export interface logoutResponse {
  message: string;
}
