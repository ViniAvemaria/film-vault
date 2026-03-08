import { useState } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import { useSection } from "../contexts/SectionContext";

const Header = () => {
    const { activeSection, setActiveSection } = useSection();
    const { setActiveTab: setMoviesTab, setSearch: setMovieSearch } = useMovies();
    const { setActiveTab: setSeriesTab, setSearch: setSeriesSearch } = useSeries();

    const setActiveTab = activeSection === "movies" ? setMoviesTab : setSeriesTab;
    const setSearch = activeSection === "movies" ? setMovieSearch : setSeriesSearch;

    const [query, setQuery] = useState("");

    return (
        <header className="flex items-center w-full z-10 bg-secundary-bg/90 backdrop-blur-lg h-20 fixed border-b border-border">
            <div className="flex justify-between gap-8 max-w-300 w-full mx-auto px-8">
                <h1 className="text-accent text-3xl font-bold whitespace-nowrap">Film Vault</h1>

                <div className="group flex items-center w-full max-w-lg border border-border bg-input-bg px-4 py-2 rounded-3xl gap-3 dark:border-border-dark focus-within:border-accent transition-colors duration-300 ease">
                    <input
                        id="search-bar"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearch(query);
                                setActiveTab("search");
                            }
                        }}
                        autoComplete="off"
                        placeholder="Search for movies..."
                        className="w-full focus:outline-none text-primary-text pl-1"
                    />

                    <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setQuery("")}
                        className="text-secundary-text group-focus-within:text-focus-ring transition-colors duration-300 ease text-sm cursor-pointer px-1"
                    >
                        {query && <i className="fa-solid fa-x"></i>}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch(query);
                            setActiveTab("search");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="cursor-pointer px-1"
                    >
                        <i className="fa-solid fa-magnifying-glass text-secundary-text group-focus-within:text-accent transition-colors duration-300 ease"></i>
                    </button>
                </div>

                <nav className="flex gap-4">
                    <select
                        className="text-center text-accent bg-secundary-bg border border-border px-2 py-1 rounded-lg cursor-pointer outline-none focus:ring-accent focus:border-accent hover:bg-dark-hover transition-colors duration-300 ease"
                        onChange={(e) => setActiveSection(e.target.value)}
                        value={activeSection}
                    >
                        <option className="bg-secundary-bg" value="movies">
                            Movies
                        </option>
                        <option className="bg-secundary-bg" value="series">
                            Series
                        </option>
                    </select>

                    <button onClick={() => setActiveTab("home")} className="header-icon">
                        <i className="fa-solid fa-house"></i>
                    </button>

                    <button onClick={() => setActiveTab("list")} className="header-icon">
                        <i className="fa-solid fa-list"></i>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
