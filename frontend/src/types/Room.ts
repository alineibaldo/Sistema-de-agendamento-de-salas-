export type Room = {
  id: string;
  name: string;
  block?: string;
  capacity?: number;
  resources?: string;
  active?: boolean;
};