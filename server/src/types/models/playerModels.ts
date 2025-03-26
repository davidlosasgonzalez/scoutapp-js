export interface PlayerVideo {
    id: number;
    youtubeId: string;
}

export interface PlayerDB {
    id: number;
    familyUserId: number;
    owner: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    birthDate: string;
    position: string;
    team: string;
    strongFoot: 'izquierda' | 'derecha' | 'dual';
}

export interface PlayerFullDB {
    id: number;
    familyUserId: number;
    owner: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    birthDate: string;
    position: string;
    skills: string;
    team: string;
    strongFoot: 'izquierda' | 'derecha' | 'dual';
    videos: PlayerVideo[];
}

export interface InsertPlayerInput {
    firstName: string;
    lastName: string;
    birthDate: string;
    position: string;
    skills: string;
    team: string;
    strongFoot: 'izquierda' | 'derecha' | 'dual';
    familyUserId: number;
}

export interface UpdatePlayerInput {
    position?: string;
    skills?: string;
    team?: string;
    strongFoot?: 'izquierda' | 'derecha' | 'dual';
    playerId: string;
}
