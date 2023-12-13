import { Router } from 'express'
import { create, getAll } from '../controllers/PetController';
import { imageUpload } from '../middleware/image-upload';

const petRoutes = Router()

petRoutes.post("/", imageUpload.array('images', 5), create)
petRoutes.get("/", getAll)
 
export default petRoutes;  