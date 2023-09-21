import { FC } from "react";
import { Pokemon } from "../../types/types";
import "./pokemonCard.css";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
  return (
    <div className="card">
      <img src={pokemon.image} alt={`${pokemon.name}-front-sprite`} />
      <h1>{pokemon.name}</h1>
    </div>
  );
};

export default PokemonCard;
