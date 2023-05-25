import {IRestUser} from "@/common/types/user";

export interface IChannel {
    id: string;
    name: string;
    type: 'public' | 'private';
    createdAt: string;
    updatedAt: string;
    ownerId: string;
    owner: IRestUser;
}

export interface ICreateChannel {
    name: string;
    type: 'public' | 'private';
    members: IRestUser[];
}