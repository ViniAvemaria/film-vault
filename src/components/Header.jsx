import { useState, useEffect, useRef } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import { useSection } from "../contexts/SectionContext";
import { useTranslation } from "react-i18next";

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

    const { i18n, t } = useTranslation();

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

    const toggleLanguage = () => {
        const newLang = i18n.language === "en-US" ? "pt-BR" : "en-US";
        localStorage.setItem("lang", newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            {openMenu && (
                <div
                    onClick={() => setOpenMenu(false)}
                    className="fixed z-15 top-0 inset-0 bg-black/35 backdrop-blur-xs"
                />
            )}

            <header className="flex items-center w-full z-10 bg-secondary-bg/90 backdrop-blur-lg h-20 fixed border-b border-border">
                <div className="flex justify-between gap-10 max-w-300 w-full mx-auto px-8 max-sm:px-6">
                    {!openSearch && (
                        <h1
                            translate="no"
                            className="text-accent text-3xl font-bold whitespace-nowrap flex items-center"
                        >
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
                            placeholder={
                                activeSection === "movies"
                                    ? t("header.search.placeholder.movies")
                                    : t("header.search.placeholder.series")
                            }
                            className="w-full focus:outline-none text-primary-text pl-1"
                        />

                        <button
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setQuery("")}
                            className="text-secondary-text group-focus-within:text-focus-ring transition-colors duration-300 ease text-sm cursor-pointer px-1"
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
                            <i className="fa-solid fa-magnifying-glass text-secondary-text group-focus-within:text-accent transition-colors duration-300 ease"></i>
                        </button>
                    </div>

                    <nav className="flex gap-4 max-[840px]:hidden">
                        <select
                            className="text-center text-accent bg-secondary-bg border border-border px-2 py-1 rounded-lg cursor-pointer outline-none focus:ring-accent focus:border-accent hover:bg-dark-hover transition-colors duration-300 ease"
                            onChange={(e) => setActiveSection(e.target.value)}
                            value={activeSection}
                        >
                            <option className="bg-secondary-bg" value="movies">
                                {t("header.select.movies")}
                            </option>
                            <option className="bg-secondary-bg" value="series">
                                {t("header.select.series")}
                            </option>
                        </select>

                        <button onClick={() => setActiveTab("home")} className="header-icon">
                            <i className="fa-solid fa-house"></i>
                        </button>

                        <button onClick={() => setActiveTab("list")} className="header-icon pt-2.5">
                            <i className="fa-solid fa-list text-lg"></i>
                        </button>

                        <button onClick={toggleLanguage} className="header-icon min-w-11.5 font-semibold">
                            {i18n.language === "en-US" ? "PT" : "EN"}
                        </button>
                    </nav>

                    <div className="min-[840px]:hidden flex gap-4">
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
                className={`flex fixed z-20 top-0 right-0 w-64 sm:w-72 h-dvh bg-secondary-bg transition-transform-opacity duration-300 ease ${openMenu ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"}`}
            >
                <ul className="flex flex-col w-full">
                    <li className="border-b border-border">
                        <button
                            onClick={() => setOpenMenu(false)}
                            className="flex items-center w-full px-5 py-6 cursor-pointer hover:text-accent transition-colors duration-300 ease"
                        >
                            <i className="fa-solid fa-x mr-3 text-sm w-4"></i>
                            {t("header.navbar.button.close")}
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
                            {t("header.navbar.button.home")}
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
                            {t("header.navbar.button.list")}
                        </button>
                    </li>

                    <li className="flex flex-col items-start gap-2">
                        <h3 className="text-secondary-text px-5 py-2 mt-2">{`${t("header.navbar.section.title")}:`}</h3>
                        <button
                            onClick={() => setActiveSection("movies")}
                            className={`flex items-center px-5 py-2 w-full cursor-pointer transition-colors duration-150 ease ${activeSection === "movies" && "text-accent"}`}
                        >
                            <span
                                className={`block w-1.5 h-1.5 rounded-lg mr-2 bg-accent transition-opacity duration-150 ease ${activeSection === "movies" ? "opacity-100" : "opacity-0"}`}
                            />
                            {t("header.navbar.section.movies")}
                        </button>

                        <button
                            onClick={() => setActiveSection("series")}
                            className={`flex items-center px-5 py-2 w-full cursor-pointer transition-colors duration-150 ease ${activeSection === "series" && "text-accent"}`}
                        >
                            <span
                                className={`block w-1.5 h-1.5 rounded-lg mr-2 bg-accent transition-opacity duration-150 ease ${activeSection === "series" ? "opacity-100" : "opacity-0"}`}
                            />
                            {t("header.navbar.section.series")}
                        </button>
                    </li>

                    <li className="border-t border-border mt-2">
                        <h3 className="text-secondary-text px-5 py-2 mt-2">{`${t("header.navbar.language.title")}:`}</h3>
                        <button
                            onClick={() => i18n.changeLanguage("pt-BR")}
                            className={`flex items-center px-5 py-2 w-full cursor-pointer transition-colors duration-150 ease ${i18n.language === "pt-BR" && "text-accent"}`}
                        >
                            <span
                                className={`block w-1.5 h-1.5 rounded-lg mr-2 bg-accent transition-opacity duration-150 ease ${i18n.language === "pt-BR" ? "opacity-100" : "opacity-0"}`}
                            />
                            {t("header.navbar.language.ptBR")}
                        </button>

                        <button
                            onClick={() => i18n.changeLanguage("en-US")}
                            className={`flex items-center px-5 py-2 w-full cursor-pointer transition-colors duration-150 ease ${i18n.language === "en-US" && "text-accent"}`}
                        >
                            <span
                                className={`block w-1.5 h-1.5 rounded-lg mr-2 bg-accent transition-opacity duration-150 ease ${i18n.language === "en-US" ? "opacity-100" : "opacity-0"}`}
                            />
                            {t("header.navbar.language.enUS")}
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
