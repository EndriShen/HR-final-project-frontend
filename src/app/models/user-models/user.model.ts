import { UserRole } from "../enums/user-role.enum";
import { Timesheet } from "../timesheet-models/timesheet.model";

export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    role?: UserRole;
    daysOff?: number;
    createdAt?: string;
    createdBy?: string;
    modifiedAt?: string;
    modifiedBy?: string;
    timesheets?: Timesheet[];
}