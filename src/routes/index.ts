
import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import cat from "./cats";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/cat", cat);

export default routes;