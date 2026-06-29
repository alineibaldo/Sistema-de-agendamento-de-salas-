export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  active?: boolean;
  mustChangePassword?: boolean;
  createdAt?: string;
};