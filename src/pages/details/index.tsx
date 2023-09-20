import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Pokemon } from "../../types/types";
import { setCurrentPokemon } from "../../redux/pokemonsSlice";

const Details: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const currentPokemon = useAppSelector(
    (state) => state.pokemon.currentPokemon
  );
  const [displayCurrentPokemon, setdisplayCurrentPokemon] =
    useState<Pokemon | null>();

  useEffect(() => {
    setdisplayCurrentPokemon(currentPokemon);
    if (!currentPokemon) {
      const resp = pokemons.filter((pokemon) => pokemon.id === Number(id));
      setdisplayCurrentPokemon(resp[0]);
    }
  }, [pokemons]);

  const handleBackButton = () => {
    dispatch(setCurrentPokemon(null));
    navigate(-1);
  };

  return (
    <div>
      <button onClick={handleBackButton}>Go back</button>
      <img src={displayCurrentPokemon?.image} alt="current-pokemon-sprite" />
      <h2>{displayCurrentPokemon?.name}</h2>
      <span>{displayCurrentPokemon?.type}</span>
      <ul>
        {displayCurrentPokemon?.stats.map((stat) => (
          <li key={`${displayCurrentPokemon?.name}-${stat.statName}`}>
            <h3>
              {stat.statName}: {stat.stat}
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
