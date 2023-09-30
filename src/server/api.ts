import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/task";

// This is remultExpress is using to perform all the misions of our api

export const api = remultExpress({
    entities:[Task]
})