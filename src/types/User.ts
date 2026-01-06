// src/types/User.ts
export interface User {
  _id?: string;
  email: string;
  password: string; // hashed
  name?: string;
  role: 'user' | 'admin'; // NEW: role field
}