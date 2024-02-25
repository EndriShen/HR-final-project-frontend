import { StatusType } from "../enums/status-type.enum";
import { User } from "../user-models/user.model";

export class Timesheet {
    id?: number;
    userId?: number;
    fromDate?: string;
    toDate?: string;
    status?: StatusType;
    note?: string;
    createdAt?: string;
    createdBy?: string;
    modifiedAt?: string;
    modifiedBy?: string;    
    user?: User;                           
}