export interface Team {
    id: number;
    name: string;
    stadium: string;
    founded: number;
    imageUrl: string;
    isChampion: boolean;
}

export interface Speler {
    id: number;
    name: string;
    description: string;
    age: number;
    isActive: boolean;
    birthdate: string;
    imageUrl: string;
    position: string;
    hobbies: string[];
    team: Team;
}
