export type TUserRole = 'admin' | 'user';

export const userRole= {
    "admin": 'admin', 
    "user": 'user'   
}as const;

export type TErrorSource = {
    path: string | number;
    message: string;
  }[];