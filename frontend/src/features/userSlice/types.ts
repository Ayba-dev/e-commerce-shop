export interface User {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export interface IUser {
  _id: number,
  name: string,
  email?: string,
  password?: string,
  confirmPassword: string,
  role?: string,
  cartItems?: string[],
}


export interface IUserType {
  user: IUser | null,
}

