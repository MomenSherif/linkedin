import { Skill } from 'src/app/_models/skill';

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  postalCode: string;
  skills?: Skill[];
  about?: string;
  jobTitle?: string;
  company?: string;
  phoneNumber?: string;
  profileUrl?: string;

}
