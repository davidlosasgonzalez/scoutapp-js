// Definimos los roles válidos del sistema.
export const VALID_ROLES = ['family', 'scout'] as const;
export type UserRole = (typeof VALID_ROLES)[number];

export interface AuthUserDB {
    id: number;
    password: string;
    role: UserRole;
}

export interface UserProfileDB {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    avatar: string | null;
    role: UserRole;
    createdAt: string;
}

export interface RegisterUserInput {
    username: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
    repeatedPass?: string;
    role: UserRole;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface UpdateUserInput {
    username?: string;
    email?: string;
    userId: number;
}

export interface UpdateUserAvatarInput {
    avatarName: string;
    userId: number;
}
