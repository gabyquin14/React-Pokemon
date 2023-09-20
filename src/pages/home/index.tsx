import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  setCurrentPokemon,
  setSearchPokemons,
} from "../../redux/pokemonsSlice";
import { Pokemon } from "../../types/types";
import PokemonCard from "../../components/pokemonCard";
import styles from "./home.module.css";
import SearchNav from "../../components/searchNav";

const Home = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const searchPokemons = useAppSelector(
    (state) => state.pokemon.searchPokemons
  );
  const [displayPokemons, setDisplayPokemons] = useState<Pokemon[]>();

  useEffect(() => {
    setDisplayPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    if (searchPokemons && searchPokemons.length > 0) {
      setDisplayPokemons(searchPokemons);
    } else {
      setDisplayPokemons(pokemons);
    }
  }, [searchPokemons]);

  return (
    <div className={styles.home}>
      <SearchNav />
      <ul className={styles.cards_display}>
        {displayPokemons?.map((pokemon) => (
          <li
            key={pokemon.id}
            onClick={() => {
              dispatch(setSearchPokemons([]));
              dispatch(setCurrentPokemon(pokemon));
            }}
          >
            <Link to={`details/${pokemon.id}`}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
