export type Booking = {
  id: string;
  title: string;
  purpose?: string;
  status: string;
  startTime: string;
  endTime: string;
  room: {
    id?: string;
    name: string;
  };
  user?: {
    name: string;
  };
};