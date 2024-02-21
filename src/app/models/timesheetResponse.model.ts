import { SaveTimesheetRequest } from "./saveTimesheetRequest.model";

export interface TimesheetResponse {
  timesheetRequest: SaveTimesheetRequest;
  errorMessage: string;
}