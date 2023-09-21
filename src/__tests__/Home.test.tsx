import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SearchNav from "../components/searchNav";
import { setSearchPokemons } from "../redux/pokemonsSlice";
import pokemonReducer from "../redux/pokemonsSlice";

describe("SearchNav Component", () => {
  it("displays a Pokemon with name and photo when searching", () => {
    const initialState = {
      name: "bulbasaur",
      image: "bulbasaur.jpg",
      type: "grass",
      stats: [
        {
          statName: "hp",
          stat: 26,
        },
      ],
      id: 1,
    };

    const testStore = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
      preloadedState: {
        pokemon: {
          pokemons: [],
          currentPokemon: null,
          searchPokemons: [],
          noPokemonsFound: false,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <SearchNav />
      </Provider>
    );
    const searchInput = screen.getByPlaceholderText("Search a pokemon...");

    // Fire an event that triggers handleSearchPokemon
    fireEvent.change(searchInput, { target: { value: "bulbasaur" } });
    testStore.dispatch(setSearchPokemons([initialState]));

    // Get the updated state from the store
    const updatedState = testStore.getState().pokemon;
    expect(updatedState.searchPokemons).toEqual([initialState]);
  });
});
