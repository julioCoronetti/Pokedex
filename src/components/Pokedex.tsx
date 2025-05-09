import { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";

export const Pokedex = () => {
	const [pokemons, setPokemons] = useState([]);

	async function fetchPokemon() {
		const response = await fetch("https://pokedex.mimo.dev/api/pokemon");
		const data = await response.json();
		setPokemons(data);
	}

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<>
			<h1>Pokédex</h1>
			<ul>
				{pokemons.map((pokemon, index) => (
					<PokemonCard key={index} pokemon={pokemon} />
				))}
			</ul>
		</>
	);
};
