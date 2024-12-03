export interface IResource {
  id: number;
  name: string;
  quantity: number;
  room: {
    name: string;
  };
  description: string;
}
