import {Contacts} from "../contact/contact";


export interface Zulieferer {
  id: number; // Liferant ID
  title: string; // Name of the Company or Name
  link: string
  description: string; //
  belongsTo: string
  uuid: string;
  updatedAt: string;
  successAt: string;
  timetableId: number;
  contacts: Contacts[]
}

