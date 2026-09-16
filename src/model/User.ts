export default interface User {
  id: number;
  name: string;
  email: string;
  enabled: boolean;
  image?: string;
  updatedAt?: string;
  createdAt?: string;
  provider: string;
}