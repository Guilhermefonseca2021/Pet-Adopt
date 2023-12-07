import { Router } from "express";
import { createUser, loginUser } from "../controllers/UserController";

const routes = Router();

routes.post("/register", createUser);
routes.post("/login", loginUser);

export default routes;
 