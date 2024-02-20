import { SaveTimesheet } from "./saveTimesheet.model";

export interface SaveTimesheetRequest {
    saveTimesheet: SaveTimesheet;
    userId?: number;
  }