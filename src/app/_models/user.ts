import { Education } from './education';

export interface User {
    id?: string;
    about?: string;
    profileUrl?: string;
    address?: string;
    city?: string;
    country?: string;
    company?: string;
    email?: string;
    jobTitle?: string;
    name?: string;
    phoneNumber?: string;
    educations?: Education[];
}
