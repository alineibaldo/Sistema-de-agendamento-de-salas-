import type { Booking } from './Booking';

export type DashboardStats = {
  totalRooms: number;
  totalBookings: number;
  pendingBookings: number;
  approvedBookings: number;
  cancelledBookings: number;
  nextBookings: Booking[];
};