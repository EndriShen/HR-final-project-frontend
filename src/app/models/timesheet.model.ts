export class Timesheet {
    id?: number;
    userId?: number;
    fromDate?: string;
    toDate?: string;
    status?: 'PENDING' | 'APPROVED' | 'REJECTED';
    note?: string;
    createdAt?: string;
    createdBy?: string;
    modifiedAt?: string;
    modifiedBy?: string;                                
}