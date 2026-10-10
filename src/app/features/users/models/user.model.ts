


export type role = 'Développeur'| 'Designer' |'Chef de projet' | 'Testeur'; 
export interface User {
  id: number;
  name: string;
  email: string;
  role: role;
  active: boolean;
}