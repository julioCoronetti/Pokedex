import { useEffect, useState } from "react";

export const Pokedex = () => {
	const [pokemons, setPokemons] = useState([] as any);

	const fetchPokemons = async () => {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
		const data = await response.json();
		setPokemons(data.results);
	};

	useEffect(() => {
		fetchPokemons();
	}, []);

	return (
		<div>
			<h1 className="text-3xl mt-13 mb-5">Pokédex</h1>
			<ul>
				{pokemons.map((pokemon: any, index: number) => (
					<li key={index}>
						{pokemon.name}
					</li>
				))}
			</ul>
		</div>
	);
};
