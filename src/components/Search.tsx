import { useState, useEffect } from "react";
import { PokemonCard } from "./PokemonCard";

interface Pokemon {
	name: string;
	url: string;
}

export const Search = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
	const [input, setInput] = useState("");

	async function fetchPokemons() {
		const response = await fetch("https://pokedex.mimo.dev/api/pokemon");
		const data: Pokemon[] = await response.json();
		setPokemons(data);
	}

	useEffect(() => {
		fetchPokemons();
	}, []);

	useEffect(() => {
		if (input === "") {
			setFilteredPokemons([]);
		} else {
			const filtered = pokemons.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(input.toLowerCase()),
			);
			setFilteredPokemons(filtered);
		}
	}, [input, pokemons]);

	return (
		<div>
			<h1>Search a Pokémon</h1>
			<input onChange={(e) => setInput(e.target.value)} />
			<ul>
				{filteredPokemons.map((pokemon, index) => (
					<PokemonCard pokemon={pokemon} key={index} />
				))}
			</ul>
		</div>
	);
};
