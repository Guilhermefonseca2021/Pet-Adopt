import { Router } from "express";
import {
  checkUser,
  createUser,
  editUser,
  getUserById,
  loginUser,
} from "../controllers/UserController";
import checkToken from "./../middleware/verify-token";
import { imageUpload } from "../middleware/image-upload";

const userRoutes = Router();

userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/checkuser", checkUser);
userRoutes.get("/:id", getUserById);

userRoutes.use(checkToken);
userRoutes.patch("/edit/:id", imageUpload.single("image"), editUser);
  
export default userRoutes;
