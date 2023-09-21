import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPokemon,
  setSearchPokemons,
} from "../../redux/pokemonsSlice";
import { Pokemon } from "../../types/types";
import PokemonCard from "../../components/pokemonCard";
import "./home.css";
import SearchNav from "../../components/searchNav";
import { RootState } from "../../redux/store";

const Home = () => {
  const loadingGif = require("../../icons/loading.gif");
  const dispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const noPokemonsFound = useSelector(
    (state: RootState) => state.pokemon.noPokemonsFound
  );
  const searchPokemons = useSelector(
    (state: RootState) => state.pokemon.searchPokemons
  );
  const [displayPokemons, setDisplayPokemons] = useState<Pokemon[]>();

  useEffect(() => {
    setDisplayPokemons(pokemons);
  }, [pokemons]);

  useEffect(() => {
    if (searchPokemons && searchPokemons.length > 0) {
      setDisplayPokemons(searchPokemons);
    } else if (noPokemonsFound) {
      setDisplayPokemons([]);
    } else {
      setDisplayPokemons(pokemons);
    }
  }, [searchPokemons, noPokemonsFound]);

  return (
    <div className="home">
      <h1 className="main-title">Welcome to Pokedex</h1>
      <SearchNav />

      {displayPokemons?.length ? (
        <ul className="cards_display" data-testid="pokemon-cards">
          {displayPokemons.map((pokemon) => (
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
      ) : noPokemonsFound ? (
        <>
          <h1>No pokemons with that name</h1>
        </>
      ) : (
        <>
          <img
            src={loadingGif}
            alt=""
            width={200}
            height={200}
            style={{ margin: "0 auto" }}
          />
        </>
      )}
    </div>
  );
};

export default Home;
