import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PokemonDetailsProps {
	name: string;
	height: number;
	weight: number;
	abilities: { ability: { name: string } }[];
	types: { type: { name: string } }[];
	sprites: {
		front_default: string;
	};
}

export const Pokemon = () => {
	const [pokemon, setPokemon] = useState<PokemonDetailsProps | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const query = new URLSearchParams(useLocation().search);
	const pokemonName = query.get("name");

	useEffect(() => {
		const fetchPokemon = async () => {
			if (pokemonName) {
				try {
					const response = await fetch(
						`https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
					);
					const data = await response.json();
					setPokemon(data);
					setLoading(false);
					setError(null);
				} catch (err) {
					if (err instanceof Error) {
						setError(err.message);
					}
					setLoading(false);
				}
			}
		};

		fetchPokemon();
	}, [pokemonName]);

	return (
		<>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			{pokemon && (
				<main className="flex flex-col items-center ">
					<h1 className="text-3xl mt-13 mb-5">{pokemon?.name} Details</h1>
					<img
						src={pokemon.sprites.front_default}
						alt={pokemon.name}
						onError={(e) => {
							const target = e.currentTarget;
							if (!target.dataset.retried) {
								target.dataset.retried = "true";
								target.src =
									pokemon.sprites.front_default ||
									"https://via.placeholder.com/96?text=No+Image";
							} else {
								target.src = "https://via.placeholder.com/96?text=No+Image";
							}
						}}
					/>
					<p>Height: {pokemon.height}</p>
					<p>Weight: {pokemon.weight}</p>
					<p>
						Abilities:{" "}
						{pokemon.abilities.map(({ ability }) => ability.name).join(", ")}
					</p>
					<p>Types: {pokemon.types.map(({ type }) => type.name).join(", ")}</p>
				</main>
			)}
		</>
	);
};
