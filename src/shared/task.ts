import { Entity, Fields } from "remult";

// זה יהיה בעצם מקןר המידע שיהיה משותף בין הבקאנד והפרונט  

// This decorator is mean that the server can to perform all cryd operations by the api  
// And allow to creare tables in the database, mapping the access to the database, create the api's, and create the frontend that connect with the backend

@Entity("tasks", {
allowApiCrud: true
})
export class Task {
  @Fields.autoIncrement()
  id = 0;
  @Fields.string()
  title = "";
  @Fields.boolean()
  completed = false;
}
