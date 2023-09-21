import { FC, useEffect, useState } from "react";
import "./details.css";
import { useNavigate, useParams } from "react-router-dom";
import { Pokemon } from "../../types/types";
import { setCurrentPokemon } from "../../redux/pokemonsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Details: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const pokemons = useSelector((state: RootState) => state.pokemon.pokemons);
  const currentPokemon = useSelector(
    (state: RootState) => state.pokemon.currentPokemon
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
    <div className="details">
      <button className="back_button" onClick={handleBackButton}>
        Go back
      </button>
      <div className="content_container">
        <img
          src={displayCurrentPokemon?.image}
          alt="current-pokemon-sprite"
          className="pokemon_profile"
        />
        <div className="content">
          <h2 className="pokemon_name">{displayCurrentPokemon?.name}</h2>
          <div className="type_container">
            {displayCurrentPokemon?.type.map((type) => (
              <span
                className="pokemon_type"
                key={`${displayCurrentPokemon.name}-${type}`}
              >
                {type}
              </span>
            ))}
          </div>

          <ul className="stats">
            {displayCurrentPokemon?.stats.map((stat) => (
              <li key={`${displayCurrentPokemon?.name}-${stat.statName}`}>
                <h3>
                  {stat.statName}: {stat.stat}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
