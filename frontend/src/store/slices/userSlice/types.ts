export interface User {
    name: string,
    email: string,
    role: string,
    password: string,
    confirmPassword: string,
}

export interface IUserType {
    user: User | null,
    isAuthenticated: boolean
}