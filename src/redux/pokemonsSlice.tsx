import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../types/types";

export interface PokemonState {
  pokemons: Pokemon[];
  currentPokemon: Pokemon | null;
  searchPokemons: Pokemon[] | null;
  noPokemonsFound: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  currentPokemon: null,
  searchPokemons: [],
  noPokemonsFound: false,
};

export const pokeSlice = createSlice({
  name: "pokemonSlice",
  initialState,
  reducers: {
    setPokemons: (state, actions: PayloadAction<Pokemon[]>) => {
      state.pokemons = actions.payload;
    },
    setCurrentPokemon: (state, actions: PayloadAction<Pokemon | null>) => {
      state.currentPokemon = actions.payload;
    },
    setNoPokemonFound: (state, actions: PayloadAction<boolean>) => {
      state.noPokemonsFound = actions.payload;
    },
    setSearchPokemons: (state, actions: PayloadAction<Pokemon[] | null>) => {
      state.searchPokemons = actions.payload;
    },
  },
});

export const {
  setPokemons,
  setCurrentPokemon,
  setSearchPokemons,
  setNoPokemonFound,
} = pokeSlice.actions;
export default pokeSlice.reducer;
