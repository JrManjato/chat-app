
export interface ICreateUser {
    email: string;
    password: string;
    name: string;
    bio?: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IRestUser {
    id: number;
    email: string;
    name: string;
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