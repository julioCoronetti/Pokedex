import { Link } from "react-router-dom";
import type { PokemonProps } from "./Pokedex";

export const PokemonCard = ({ name, sprites }: PokemonProps) => {
	return (
		<Link to={`/pokemon?name=${name}`}>
			<div className="bg-amber-50 rounded-lg p-4 flex flex-col items-center shadow-xl">
				<h2>{name}</h2>
				<img src={sprites.front_default} alt={name} />
			</div>
		</Link>
	);
};
