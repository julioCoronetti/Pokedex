import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";
import type { PokemonProps } from "./Pokedex";

export const Search = () => {
	const [allPokemons, setAllPokemons] = useState<PokemonProps[]>([]);
	const [filteredPokemons, setFilteredPokemons] = useState<any[]>([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=1302")
			.then((res) => res.json())
			.then((data) => setAllPokemons(data.results));
	}, []);

	useEffect(() => {
		const fetchFiltered = async () => {
			if (input === "") {
				setFilteredPokemons([]);
				return;
			}

			const filtered = allPokemons.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(input.toLowerCase()),
			);

			const detailed = await Promise.all(
				filtered.slice(0, 10).map(async (pokemon) => {
					const res = await fetch(pokemon.url);
					return await res.json();
				}),
			);

			setFilteredPokemons(detailed);
		};

		fetchFiltered();
	}, [input, allPokemons]);

	return (
		<div>
			<h1 className="text-3xl mt-13 mb-5">Search</h1>
			<input
				onChange={(e) => setInput(e.target.value)}
				className="bg-amber-50 p-2 rounded-md mb-5 outline-none"
				placeholder="Search Pokémon..."
			/>
			<ul className="grid grid-cols-3 gap-4 mb-13">
				{filteredPokemons
					.filter((pokemon) => pokemon.sprites?.front_default)
					.map((pokemon) => (
						<PokemonCard
							key={pokemon.id}
							name={pokemon.name}
							sprites={pokemon.sprites}
							url={`https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`}
						/>
					))}
			</ul>
		</div>
	);
};
