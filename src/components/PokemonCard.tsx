import { Link } from "react-router-dom";

export interface PokemonCardProps {
    pokemon: {
        name: string;
        url: string;
    };
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
	function getPokemonSpriteUrl() {
		return `https://raw.githubusercontent.com/getmimo/things-api/main/files/pokedex/sprites/master/sprites/pokemon/${pokemon.url.split("/").filter(Boolean).pop()}.png`;
	}

	return (
		<Link to={`/pokemon?name=${pokemon.name}`}>
			<div className="pokemon-card">
				<h2>{pokemon.name}</h2>
				<img src={getPokemonSpriteUrl()} alt={pokemon.name} />
			</div>
		</Link>
	);
};
