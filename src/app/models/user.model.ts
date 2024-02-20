export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    role?: 'USER' | 'ADMIN';
    daysOff?: number;
    createdAt?: string;
    createdBy?: string;
    modifiedAt?: string;
    modifiedBy?: string;
}