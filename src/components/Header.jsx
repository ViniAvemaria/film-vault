import { useState, useRef } from "react";

const Header = ({ setActiveTab, setSearch }) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);

    return (
        <header className="flex items-center w-full z-10 bg-secundary-bg/90 backdrop-blur-lg h-20 fixed border-b border-border">
            <div className="flex justify-between max-w-300 w-full mx-auto px-8">
                <h1 className="text-accent text-3xl font-bold">Film Vault</h1>

                <div className="group flex items-center w-full max-w-lg border border-border bg-input-bg px-4 py-2 rounded-3xl gap-3 dark:border-border-dark focus-within:border-accent transition-colors duration-300 ease">
                    <input
                        ref={inputRef}
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
                        onClick={() => {
                            setQuery("");
                            inputRef.current?.blur();
                        }}
                        className="text-secundary-text group-focus-within:text-focus-ring transition-colors duration-300 ease text-sm cursor-pointer px-1"
                    >
                        {query && <i className="fa-solid fa-x"></i>}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setSearch(query);
                            setActiveTab("search");
                        }}
                        className="cursor-pointer px-1"
                    >
                        <i className="fa-solid fa-magnifying-glass text-secundary-text group-focus-within:text-accent transition-colors duration-300 ease"></i>
                    </button>
                </div>

                <div className="flex gap-4">
                    <button onClick={() => setActiveTab("home")} className="header-icon">
                        <i className="fa-solid fa-house"></i>
                    </button>

                    <button onClick={() => setActiveTab("list")} className="header-icon">
                        <i className="fa-solid fa-list"></i>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
