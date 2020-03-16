import { Skill } from 'src/app/_models/skill';
import { Education } from './education';

export interface User {
  id?: string;
  email: string;
  postalCode: string;
  name?: string;
  skills?: Skill[];
  about?: string;
  jobTitle?: string;
  company?: string;
  phoneNumber?: string;
  profileUrl?: string;
  educations?: Education[];
  address?: { city?: string, country?: string };

}


