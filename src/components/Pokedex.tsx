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
	const [loading, setLoading] = useState(true);
	const [offset, setOffset] = useState(0);

	const fetchPokemons = async (currentOffset = 0) => {
		setLoading(true);
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${currentOffset}`,
		);
		const data = await response.json();

		const detailedPokemons = await Promise.all(
			data.results.map(async (pokemon: PokemonProps) => {
				const response = await fetch(pokemon.url);
				return await response.json();
			}),
		);

		if (currentOffset === 0) {
			setPokemons(detailedPokemons);
		} else {
			setPokemons((prev) => [...prev, ...detailedPokemons]);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchPokemons(offset);
	}, [offset]);

	const handleLoadMore = () => {
		setOffset((prev) => prev + 12);
	};

	return (
		<>
			<div>
				<h1 className="text-3xl mt-13 mb-5">Pokédex</h1>
				{loading && <p className="mt-20">Loading...</p>}
				<ul className="grid grid-cols-3 gap-4">
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
				<button
					className="mt-10 mb-13 px-4 py-3 bg-red-600 shadow-xl text-white rounded-xl cursor-pointer hover:bg-red-700 transition duration-300"
					onClick={handleLoadMore}
					disabled={loading}
				>
					{loading ? "Loading..." : "Load More"}
				</button>
			</div>
		</>
	);
};
