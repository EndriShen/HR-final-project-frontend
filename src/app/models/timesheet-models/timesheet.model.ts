import { StatusType } from "../enums/status-type.enum";

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
}