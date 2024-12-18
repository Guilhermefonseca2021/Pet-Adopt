import { Router } from "express";
import {
  concludeAdoption,
  create,
  getAll,
  getAllUserAdoptions,
  getAllUserPet,
  getPetById,
  removePetById,
  scheduleAdoption,
  updatePet,
} from "../controllers/PetController";
import { imageUpload } from "../middleware/image-upload";
import checkToken from "../middleware/verify-token";

const petRoutes = Router();

petRoutes.post("/", imageUpload.array("images", 5), create);
petRoutes.get("/", getAll);
petRoutes.get("/:id", getPetById);
 
petRoutes.use(checkToken);
petRoutes.get("/mypets", getAllUserPet);
petRoutes.get("/myadoptions", getAllUserAdoptions);
petRoutes.delete("/:id", removePetById);
petRoutes.patch("/:id", imageUpload.array("images"), updatePet);
petRoutes.patch("/schedule", scheduleAdoption);
petRoutes.patch("/conclude", concludeAdoption);
 
export default petRoutes;
 