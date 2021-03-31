export interface User{
  account: string;
  password: string;
}

export interface UserResponse 
{
  code: number;
  message: string;
  data: any;
}