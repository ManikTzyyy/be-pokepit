import express from "express";
import authController from "../controllers/auth.controller";
import createController from "../controllers/create.controller";

const router = express.Router();

router.post("/auth/register", authController.register);

router.post("/create/pokemon", createController.createPokemon);

export default router;
