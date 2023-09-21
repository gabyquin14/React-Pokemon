import { PokemonState } from "./pokemonsSlice";

type RootState = {
  pokemon: PokemonState;
};

const state = {
  pokemons: [],
  currentPokemon: null,
  searchPokemons: [],
};
export const testUseAppSelector = (f: Function) => f(state);
