export interface EventModel {
    id?: number;
    title: string;
    description: string;
    eventDate: string;        // "2026-06-15"
    eventTime: string;        // "18:00"
    location: string;
    maxParticipants: number;
    creator?: {
        id: number;
        email: string;
    };
    // Papildu lauki priekš UI (aprēķināti frontendā):
    currentParticipants?: number;
    isJoined?: boolean;
    isFull?: boolean;
}