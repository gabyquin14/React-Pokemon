import React, { useState } from "react";
import "./searchNav.css";
import {
  setSearchPokemons,
  setNoPokemonFound,
} from "../../redux/pokemonsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SearchNav = () => {
  const [searchPokemon, setSearchPokemon] = useState("");
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const dispatch = useDispatch();

  const handleSearchPokemon = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    let inputValue = event.target.value;
    setSearchPokemon(inputValue);
    let filtered = pokemons.filter((pokemon) => {
      const searchTerm = inputValue.toString().toLowerCase();
      const pokeName = pokemon.name.toLocaleLowerCase();
      return searchTerm && pokeName.startsWith(searchTerm);
    });
    const noPokemonFound = inputValue.length > 0 && filtered.length === 0;

    dispatch(setNoPokemonFound(noPokemonFound));
    dispatch(setSearchPokemons(filtered));
  };

  return (
    <div>
      <input
        type="text"
        id="searchPokemon"
        name="searchPokemon"
        className="search_input"
        onChange={handleSearchPokemon}
        value={searchPokemon}
        placeholder="Search a pokemon..."
      />
    </div>
  );
};

export default SearchNav;
