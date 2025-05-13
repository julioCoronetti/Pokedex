import { Link } from "react-router-dom";
import type { PokemonProps } from "./Pokedex";

export const PokemonCard = ({ name, sprites }: PokemonProps) => {
	return (
		<Link to={`/pokemon?name=${name}`}>
			<div className="bg-white rounded-lg p-4 flex flex-col items-center shadow-xl hover:scale-105 transition duration-300">
				<h2>{name}</h2>
				{sprites?.front_default ? (
					<img
						src={sprites.front_default}
						alt={name}
						onError={(e) => {
							const target = e.currentTarget;
							if (!target.dataset.retried) {
								target.dataset.retried = "true";
								target.src =
									sprites.front_default ||
									"https://via.placeholder.com/96?text=No+Image";
							} else {
								target.src = "https://via.placeholder.com/96?text=No+Image";
							}
						}}
					/>
				) : (
					<p>No image available</p>
				)}
			</div>
		</Link>
	);
};
