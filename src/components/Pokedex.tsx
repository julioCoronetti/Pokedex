import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";

export interface PokemonProps {
	name: string;
	url: string;
	sprites: {
		front_default: string;
	};
}

export const Pokedex = () => {
	const [pokemons, setPokemons] = useState<PokemonProps[]>([]);

	const fetchPokemons = async () => {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
		const data = await response.json();

		const detailedPokemons = await Promise.all(
			data.results.map(async (pokemon: PokemonProps) => {
				const response = await fetch(pokemon.url);
				return await response.json();
			}),
		);

		setPokemons(detailedPokemons);
	};

	useEffect(() => {
		fetchPokemons();
	}, []);

	return (
		<div>
			<h1 className="text-3xl mt-13 mb-5">Pokédex</h1>
			<ul className="grid grid-cols-3 gap-4 mb-13">
				{pokemons.map((pokemon, index) => (
					<li key={index}>
						<PokemonCard
							name={pokemon.name}
							sprites={pokemon.sprites}
							url={pokemon.url}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
