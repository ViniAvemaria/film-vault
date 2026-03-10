import { useState, useEffect, useRef } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import { useSection } from "../contexts/SectionContext";

const Header = () => {
    const { activeSection, setActiveSection } = useSection();
    const { setActiveTab: setMoviesTab, setSearch: setMovieSearch, setPage: setMoviesPage } = useMovies();
    const { setActiveTab: setSeriesTab, setSearch: setSeriesSearch, setPage: setSeriesPage } = useSeries();

    const setActiveTab = activeSection === "movies" ? setMoviesTab : setSeriesTab;
    const setSearch = activeSection === "movies" ? setMovieSearch : setSeriesSearch;
    const setPage = activeSection === "movies" ? setMoviesPage : setSeriesPage;

    const [query, setQuery] = useState("");

    const [openMenu, setOpenMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        if (openSearch) {
            searchRef.current?.focus();
        }
    }, [openSearch]);

    useEffect(() => {
        if (openMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [openMenu]);

    return (
        <>
            {openMenu && (
                <div
                    onClick={() => setOpenMenu(false)}
                    className="fixed z-15 top-0 inset-0 bg-black/35 backdrop-blur-xs"
                />
            )}

            <header className="flex items-center w-full z-10 bg-secundary-bg/90 backdrop-blur-lg h-20 fixed border-b border-border">
                <div className="flex justify-between gap-8 max-w-300 w-full mx-auto px-8 max-sm:px-6">
                    {!openSearch && (
                        <h1 className="text-accent text-3xl font-bold whitespace-nowrap flex items-center">
                            Film Vault
                        </h1>
                    )}

                    <div
                        onBlur={() => setOpenSearch(false)}
                        className={`group flex items-center w-full max-w-lg border border-border bg-input-bg px-4 py-2 rounded-3xl gap-3 dark:border-border-dark focus-within:border-accent transition-colors duration-300 ease ${openSearch ? "max-[550px]:visible" : "max-[550px]:hidden"}`}
                    >
                        <input
                            ref={searchRef}
                            id="search-bar"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setPage(1);
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
                                setPage(1);
                                setSearch(query);
                                setActiveTab("search");
                            }}
                            className="cursor-pointer px-1"
                        >
                            <i className="fa-solid fa-magnifying-glass text-secundary-text group-focus-within:text-accent transition-colors duration-300 ease"></i>
                        </button>
                    </div>

                    <nav className="flex gap-4 max-[740px]:hidden">
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

                        <button onClick={() => setActiveTab("list")} className="header-icon pt-2.5">
                            <i className="fa-solid fa-list text-lg"></i>
                        </button>
                    </nav>

                    <div className="min-[740px]:hidden flex gap-4">
                        <button
                            onClick={() => setOpenSearch(true)}
                            className={`${openSearch ? "max-[550px]:hidden" : "min-[550px]:hidden"} text-xl header-icon py-2.5`}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>

                        <button onClick={() => setOpenMenu(true)} className="header-icon text-xl py-2.5">
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                </div>
            </header>

            <nav
                className={`flex fixed z-20 top-0 right-0 w-64 sm:w-72 h-dvh bg-secundary-bg transition-transform-opacity duration-300 ease ${openMenu ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"}`}
            >
                <ul className="flex flex-col w-full">
                    <li className="border-b border-border">
                        <button
                            onClick={() => setOpenMenu(false)}
                            className="flex items-center w-full px-5 py-6 cursor-pointer hover:text-accent transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-x mr-3 text-sm w-4"></i>
                            Close
                        </button>
                    </li>

                    <li className="border-b border-border">
                        <button
                            onClick={() => {
                                setActiveTab("home");
                                setOpenMenu(false);
                            }}
                            className="flex items-center w-full px-5 py-6 cursor-pointer hover:text-accent transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-house mr-3 text-sm w-4"></i>
                            Home
                        </button>
                    </li>

                    <li className="border-b border-border">
                        <button
                            onClick={() => {
                                setActiveTab("list");
                                setOpenMenu(false);
                            }}
                            className="flex items-center w-full px-5 py-6 cursor-pointer hover:text-accent transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-list mr-3 w-4"></i>
                            List
                        </button>
                    </li>

                    <li className="flex flex-col items-start gap-2">
                        <h3 className="text-secundary-text px-5 py-2 mt-2">Select Section: </h3>
                        <button
                            onClick={() => setActiveSection("movies")}
                            className={`flex items-center px-5 py-2 w-full cursor-pointer transition-colors duration-150 ease ${activeSection === "movies" && "text-accent"}`}
                        >
                            <span
                                className={`block w-1.5 h-1.5 rounded-lg mr-2 bg-accent transition-opacity duration-150 ease ${activeSection === "movies" ? "opacity-100" : "opacity-0"}`}
                            />
                            Movies
                        </button>

                        <button
                            onClick={() => setActiveSection("series")}
                            className={`flex items-center px-5 py-2 w-full cursor-pointer transition-colors duration-150 ease ${activeSection === "series" && "text-accent"}`}
                        >
                            <span
                                className={`block w-1.5 h-1.5 rounded-lg mr-2 bg-accent transition-opacity duration-150 ease ${activeSection === "series" ? "opacity-100" : "opacity-0"}`}
                            />
                            Series
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
