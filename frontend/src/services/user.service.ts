import { api } from './api';

export const userService = {
  findAll() {
    return api.get('/users');
  },

  create(data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'SERVIDOR';
  }) {
    return api.post('/users', data);
  },

  update(
    id: string,
    data: {
      name?: string;
      email?: string;
      role?: 'ADMIN' | 'SERVIDOR';
      active?: boolean;
      temporaryPassword?: string;
    },
  ) {
    return api.patch(`/users/${id}`, data);
  },

  changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }) {
    return api.patch('/users/change-password', data);
  },
};