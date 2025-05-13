import { useEffect, useState } from "react";
import type { PokemonProps } from "./Pokedex";
import { PokemonCard } from "./PokemonCard";

export const Search = () => {
	const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
	const [filteredPokemons, setFilteredPokemons] = useState<PokemonProps[]>([]);
	const [input, setInput] = useState("");

	const fetchPokemons = async () => {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
		const data = await response.json();

		setPokemons(data.results);
	};

	useEffect(() => {
		fetchPokemons();
	}, []);

	useEffect(() => {
		if (input === "") {
			setFilteredPokemons([]);
		} else {
			const filtered = pokemons.filter((pokemon) => {
				return pokemon.name.toLowerCase().includes(input.toLowerCase());
			});
			setFilteredPokemons(filtered);
		}
	}, [input, pokemons]);

	return (
		<div>
			<h1 className="text-3xl mt-13 mb-5">Search</h1>
			<input
				onChange={(e) => setInput(e.target.value)}
				className="bg-amber-50"
			/>
			<ul>
				{filteredPokemons
					.filter((pokemon) => pokemon.sprites?.front_default)
					.map((pokemon, index) => (
						<PokemonCard
							key={index}
							name={pokemon.name}
							sprites={pokemon.sprites}
							url={pokemon.url}
						/>
					))}
			</ul>
		</div>
	);
};
