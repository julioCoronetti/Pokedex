import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Pokemon } from "./components/Pokemon";
import { Search } from "./components/Search";
import { Pokedex } from "./components/Pokedex";

function App() {
	return (
		<BrowserRouter>
			<NavigationBar />
			<div className="w-full max-w-2xl mx-auto">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/pokedex" element={<Pokedex />} />
					<Route path="/search" element={<Search />} />
					<Route path="/pokemon" element={<Pokemon />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

const NavigationBar = () => {
	return (
		<nav className="flex justify-center gap-10 bg-red-600 sticky top-0 z-1000">
			<Link
				to="/"
				className="no-underline font-bold text-yellow-100 my-[8px] transition duration-300 hover:text-black"
			>
				Home
			</Link>
			<Link
				to="/pokedex"
				className="no-underline font-bold text-yellow-100 my-[8px] transition duration-300 hover:text-black"
			>
				Pokédex
			</Link>
			<Link
				to="/search"
				className="no-underline font-bold text-yellow-100 my-[8px] transition duration-300 hover:text-black"
			>
				Search
			</Link>
		</nav>
	);
};

export default App;
