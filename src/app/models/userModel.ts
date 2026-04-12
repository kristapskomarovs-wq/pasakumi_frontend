export interface UserLoginModel {
    email: string;
    password: string;
    confirmPassword: string;  // Tikai frontendā
}

export interface UserData {
    id: number;
    email: string;
}