export interface HiringRequestForScout {
    id: number;
    status: string;
    playerId: number;
    scoutUserId: number;
    playerFirstName: string;
    playerLastName: string;
    familyEmail: string;
    familyUsername: string;
}

export interface HiringRequestForFamily {
    id: number;
    status: string;
    playerId: number;
    scoutUserId: number;
    playerFirstName: string;
    playerLastName: string;
    scoutUsername: string;
}
