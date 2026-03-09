import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MoviesProvider } from "./contexts/MoviesContext.jsx";
import { SeriesProvider } from "./contexts/SeriesContext.jsx";
import { SectionProvider } from "./contexts/SectionContext.jsx";
import { ListProvider } from "./contexts/ListContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SectionProvider>
            <MoviesProvider>
                <SeriesProvider>
                    <ListProvider>
                        <App />
                    </ListProvider>
                </SeriesProvider>
            </MoviesProvider>
        </SectionProvider>
    </StrictMode>,
);
