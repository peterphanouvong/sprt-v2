export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  datetime: string;
  hostId: number;
  host: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  points: number;
  createdAt: string;
  updatedAt: string;
}
