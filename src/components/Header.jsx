import { useState } from "react";

const Header = ({ setActiveTab }) => {
    const [search, setSearch] = useState("");
    return (
        <header className="flex items-center w-full z-10 bg-secundary-bg/90 backdrop-blur-lg h-20 fixed border-b border-border">
            <div className="flex justify-between max-w-300 w-full mx-auto px-8">
                <h1 className="text-accent text-3xl font-bold">Film Vault</h1>

                <div className="group flex items-center w-full max-w-lg border border-border bg-input-bg px-4 py-2 rounded-3xl gap-3 dark:border-border-dark focus-within:border-accent transition-colors duration-300 ease">
                    <i className="fa-solid fa-magnifying-glass text-secundary-text group-focus-within:text-accent transition-colors duration-300 ease"></i>
                    <input
                        id="search-bar"
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        autoComplete="off"
                        placeholder="Search for movies..."
                        className="w-full focus:outline-none text-primary-text"
                    />
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                            setSearch("");
                        }}
                        className="text-secundary-text group-focus-within:text-focus-ring transition-colors duration-300 ease text-sm cursor-pointer"
                    >
                        {search && <i className="fa-solid fa-x"></i>}
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
