import { Request, Response } from "express";

import PokemonModel from "../models/pokemon.model";

export default {
  async getPokemon(req: Request, res: Response) {
    try {
      const pokemons = await PokemonModel.find(
        {},
        "-createdAt -updatedAt -__v"
      );
      const result = pokemons.map((p) => ({
        _id: p._id,
        name: p.name,
        description: p.description,
        types: p.types,
        abilities: p.abilities,
        stats: p.stats,
        img: p.img,
      }));
      res.status(200).json(result);
    } catch (error) {
      const e = error as unknown as Error;
      res.status(400).json({
        message: e.message,
        data: null,
      });
    }
  },
};
