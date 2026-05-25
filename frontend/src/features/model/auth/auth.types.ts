interface User {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
  token: string;
}

interface LogoutResponse {
  success: boolean;
}

type AuthState = {
  [P in keyof LoginResponse]: LoginResponse[P] | null;
};

export type { User, LoginResponse, LogoutResponse, AuthState };
