export type TUserRole = 'admin' | 'user';

export const userRole= {
    "admin": 'admin', 
    "user": 'user'   
}as const;

export const FriendrequestType ={
    'requesting':'requesting',
    'requested':'requested',
    'deleted':'deleted',
    "accepted":'accepted',
}as const;

// requesting ==>outgoing
// requested ==>incoming

export type TErrorSource = {
    path: string | number;
    message: string;
  }[];