// src/types/User.ts
export interface DbUser {
  _id?: string;
  email: string;
  password: string; 
  name?: string;
  role: 'user' | 'admin';
}