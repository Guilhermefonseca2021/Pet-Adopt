import { Router } from 'express'
import { create } from '../controllers/PetController';

const petRoutes = Router()

petRoutes.get("/", create)

export default petRoutes;