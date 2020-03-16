import { DateType } from "./Date";

export interface Project {
  name?: string;
  description?: string;
  projectUrl?: string;
  associatedWith?: string;
  startDate?: DateType;
  endDate?: DateType;
  currentlyWorking?: boolean;
}
