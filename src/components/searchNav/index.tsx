import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSearchPokemons } from "../../redux/pokemonsSlice";

const SearchNav = () => {
  const [searchPokemon, setSearchPokemon] = useState("");
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const dispatch = useAppDispatch();

  const handleSearchPokemon = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchPokemon(event.target.value);
    let filtered = pokemons.filter((pokemon) => {
      const searchTerm = event.target.value.toString().toLowerCase();
      const pokeName = pokemon.name.toLocaleLowerCase();
      return searchTerm && pokeName.startsWith(searchTerm);
    });
    dispatch(setSearchPokemons(filtered));
  };

  return (
    <div>
      <input
        type="text"
        id="searchPokemon"
        name="searchPokemon"
        onChange={handleSearchPokemon}
        value={searchPokemon}
        placeholder="Search a pokemon..."
      />
    </div>
  );
};

export default SearchNav;
