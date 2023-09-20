import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../types/types";

interface PokemonState {
  pokemons: Pokemon[];
  currentPokemon: Pokemon | null;
  searchPokemons: Pokemon[] | null;
}

const initialState: PokemonState = {
  pokemons: [],
  currentPokemon: null,
  searchPokemons: [],
};

export const pokeSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPokemons: (state, actions: PayloadAction<Pokemon[]>) => {
      state.pokemons = actions.payload;
    },
    setCurrentPokemon: (state, actions: PayloadAction<Pokemon | null>) => {
      state.currentPokemon = actions.payload;
    },
    setSearchPokemons: (state, actions: PayloadAction<Pokemon[] | null>) => {
      state.searchPokemons = actions.payload;
    },
  },
});

export const { setPokemons, setCurrentPokemon, setSearchPokemons } =
  pokeSlice.actions;
export default pokeSlice.reducer;
