import { SaveTimesheet } from "./saveTimesheet.model";
import { User } from "../user-models/user.model";

export interface SaveTimesheetRequest {
  saveTimesheet: SaveTimesheet;
  user: User;
}