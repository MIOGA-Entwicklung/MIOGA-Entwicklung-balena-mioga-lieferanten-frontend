import {Contacts} from "../contact/contact";


export interface Zulieferer {
  id: number; // Liferant ID
  title: string; // Name of the Company or Name
  description: string; //
  belongsTo : string
  uuid: string;
  updatedAt: string;
  successAt: string;
  timetableId: number;
  link:string;
  username: string;
  password: string;
  key: string;
  contacts : Contacts[]
}

