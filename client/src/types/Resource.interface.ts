export interface IResource {
  id: number;
  name: string;
  type: string;
  quantity: number;
  description?: string;
  roomId: number;
}
