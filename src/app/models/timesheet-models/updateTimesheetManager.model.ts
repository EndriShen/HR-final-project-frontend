import { StatusType } from "../enums/status-type.enum";

export interface UpdateTimesheetManager {
    status?: StatusType;
    modifiedAt?: string;
    modifiedBy?: string;
}