import { api } from './api';

export const roomService = {
  findAll() {
    return api.get('/rooms');
  },

  create(data: {
    name: string;
    block?: string;
    capacity?: number;
    resources?: string;
    active?: boolean;
  }) {
    return api.post('/rooms', data);
  },

  update(
    id: string,
    data: {
      name?: string;
      block?: string;
      capacity?: number;
      resources?: string;
      active?: boolean;
    },
  ) {
    return api.patch(`/rooms/${id}`, data);
  },
};