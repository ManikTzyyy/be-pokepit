import express from "express";
import authController from "../controllers/auth.controller";
import createController from "../controllers/create.controller";
import getController from "../controllers/get.controller";

const router = express.Router();

router.post("/auth/register", authController.register);

router.post("/create/pokemon", createController.createPokemon);

router.get("/pokemon", getController.getPokemon);

export default router;
