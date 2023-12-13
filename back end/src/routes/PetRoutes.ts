import { Router } from "express";
import {
  create,
  getAll,
  getAllUserAdoptions,
  getAllUserPet,
} from "../controllers/PetController";
import { imageUpload } from "../middleware/image-upload";
import checkToken from "../middleware/verify-token";

const petRoutes = Router();

petRoutes.post("/", imageUpload.array("images", 5), create);
petRoutes.get("/", getAll);

petRoutes.use(checkToken);
petRoutes.get("/mypets", getAllUserPet);
petRoutes.get("/adoptions", getAllUserAdoptions);

export default petRoutes;
