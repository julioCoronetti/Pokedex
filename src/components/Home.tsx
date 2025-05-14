import pokedexImage from "../assets/pokedex.webp";

export const Home = () => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl mt-13 mb-5">Welcome to Pokédex</h1>
			<p>Explore the world of Pokémon with our comprehensive Pokédex.</p>
			<img className="w-90 mt-13" src={pokedexImage} />
		</div>
	);
};