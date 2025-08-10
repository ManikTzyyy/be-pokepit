import { Request, Response } from "express";

import * as Yup from "yup";
import PokemonModel from "../models/pokemon.model";

type TCreatePokemon = {
  name: string;
  description: string;
  types: string;
  abilities: string;
  stats: {
    hp: number;
    attack: number;
    speed: number;
    defense: number;
  };
  img: string;
};

const createPokemonValidationSchema = Yup.object({
  name: Yup.string().required(),
  description: Yup.string().required(),
  types: Yup.array().of(Yup.string().required()).min(1).required(),
  abilities: Yup.array().of(Yup.string().required()).min(1).required(),
  stats: Yup.object({
    hp: Yup.number().required(),
    attack: Yup.number().required(),
    speed: Yup.number().required(),
    defense: Yup.number().required(),
  }).required(),
  img: Yup.string().url().optional(),
});

export default {
  async createPokemon(req: Request, res: Response) {
    const { name, description, types, abilities, stats, img } =
      req.body as unknown as TCreatePokemon;
    try {
      await createPokemonValidationSchema.validate({
        name,
        description,
        types,
        abilities,
        stats,
        img,
      });
      const result = await PokemonModel.create({
        name,
        description,
        types,
        abilities,
        stats,
        img,
      });

      res.status(200).json({
        message: "Pokemon created successfully",
        data: result,
      });
    } catch (error) {
      const e = error as unknown as Error;
      res.status(400).json({
        message: e.message,
        data: null,
      });
    }
  },
};
