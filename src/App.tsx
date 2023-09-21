import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Details from "./pages/details";
import "./App.css";
import { PokemonType } from "./types/types";
import { setPokemons } from "./redux/pokemonsSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchPokemons = async () => {
      try {
        let promises = [];
        for (let i = 1; i <= 15; i++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
          promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results: PokemonType[]) => {
          const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites["front_default"],
            type: result.types.map((type) => type.type.name),
            stats: result.stats.map((stat) => ({
              statName: stat.stat.name,
              stat: stat.base_stat,
            })),
            id: result.id,
          }));
          if (isMounted) dispatch(setPokemons(pokemon));
        });
      } catch (error) {}
    };

    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
