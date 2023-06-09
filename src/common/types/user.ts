
export interface ICreateUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    bio?: string;
}

export interface IUpdateUser {
    name: string;
    oldPassword: string;
    password: string;
    confirmPassword: string;
    bio?: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IRestUser {
    id: number;
    name: string;
    email: string;
    bio: string;
}

export interface IUser {
    status: string;
    id: number;
    email: string;
    name: string;
    bio: string;
    updatedAt: string;
    createdAt: string;
    googleId?: string;
    deletedAt?: string;
    token: string;
}