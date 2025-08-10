import mongoose, { Document, Schema } from "mongoose";

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface Pokemon extends Document {
  name: string;
  description: string;
  types: string[];
  abilities: string[];
  stats: PokemonStats;
  img: string;
}

const PokemonSchema = new Schema<Pokemon>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    types: {
      type: [String],
      required: true,
    },
    abilities: {
      type: [String],
      required: true,
    },
    stats: {
      hp: {
        type: Schema.Types.Number,
        required: true,
      },
      attack: {
        type: Schema.Types.Number,
        required: true,
      },
      defense: {
        type: Schema.Types.Number,
        required: true,
      },
      speed: {
        type: Schema.Types.Number,
        required: true,
      },
    },
    img: {
      type: Schema.Types.String,
      default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
  },
  { timestamps: true }
);

const PokemonModel = mongoose.model("Pokemon", PokemonSchema);

export default PokemonModel;
