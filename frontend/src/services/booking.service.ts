import { api } from './api';

export const bookingService = {
  findAll() {
    return api.get('/bookings');
  },

  

  create(data: {
    title: string;
    roomId: string;
    startTime: string;
    endTime: string;
    userId: string;
  }) {
    return api.post('/bookings', data);
  },

  update(
    id: string,
    data: {
      title: string;
      purpose?: string;
      roomId: string;
      startTime: string;
      endTime: string;
    },
  ) {
    return api.patch(`/bookings/${id}`, data);
  },

  approve(id: string) {
    return api.patch(`/bookings/${id}/approve`);
  },

  cancel(id: string) {
    return api.patch(`/bookings/${id}/cancel`);
  },
};