export interface LoginUser {
    email?: string;
    password?: string;
}

export interface User extends LoginUser {
    name?: string;
}

export interface CreateUser extends User {
    confirmPassword?: string;
}