import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";



export const Pokemon = () => {
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const query = new URLSearchParams(useLocation().search);
	const pokemonName = query.get("name");

	useEffect(() => {
		const fetchPokemon = async () => {
			if (pokemonName) {
				try {
					const response = await fetch(
						`https://pokedex.mimo.dev/api/pokemon/${pokemonName}`,
					);
					const data = await response.json();
					setPokemon(data);
					setLoading(false);
					setError(null);
				} catch (error) {
					setError(error.message);
					setLoading(false);
				}
			}
		};

		fetchPokemon();
	}, [pokemonName]);

	return (
		<>
			{loading && <p>Loading...</p>}
			{error && <p>Error ..</p>}
			{pokemon && (
				<>
					<h1>{pokemon.name} Details</h1>
					<img src={pokemon.sprites.front_default} alt={pokemon.name} />
					<p>Height: {pokemon.height}</p>
					<p>Weight: {pokemon.weight}</p>
					<p>
						Abilities:{" "}
						{pokemon.abilities.map(({ ability }) => ability.name).join(", ")}
					</p>
					<p>Types: {pokemon.types.map(({ type }) => type.name).join(", ")}</p>
				</>
			)}
		</>
	);
};
