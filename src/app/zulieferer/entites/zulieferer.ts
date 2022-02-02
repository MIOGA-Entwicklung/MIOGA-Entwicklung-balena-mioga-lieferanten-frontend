import {Contacts} from "../../contact/contact";
import {Connection} from "./Connection";


export interface Zulieferer {
  id: number; // Liferant ID
  title: string; // Name of the Company or Name
  description: string; //
  belongsTo : string
  uuid: string;
  updatedAt: string;
  successAt: string;
  timetableId: number;
  username: string;
  password: string;
  key: string;
  contacts : Contacts[]
  connection: Connection[]
}

