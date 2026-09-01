export type User = {
    id: string;
    displayName: string;
    email: string;
    token: string;
    imageUrl?: string;
}

export type LoginCreds = {
    userName: string;
    password: string;
}

export type RegisterCreds = {
    displayName: string;
    password: string;
}