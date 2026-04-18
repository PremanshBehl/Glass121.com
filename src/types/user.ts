export type UserRole = "Homeowner" | "Architect" | "Builder" | "Dealer" | "Installer" | "User";

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

