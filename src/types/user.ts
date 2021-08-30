export interface BasicUser {
    userID: number,
  }
  
  export interface User extends BasicUser{
    userName: string,
    email?: string,
    password?: string
  }