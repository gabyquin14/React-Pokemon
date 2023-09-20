import { FC } from "react";
import { Pokemon } from "../../types/types";
import styles from "./pokemonCard.module.css";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
  return (
    <div className={styles.card}>
      <img src={pokemon.image} alt="pokemon-front-sprite" />
      <h1>{pokemon.name}</h1>
    </div>
  );
};

export default PokemonCard;
