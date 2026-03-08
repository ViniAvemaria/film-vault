import Header from "./components/Header";
import MoviesSection from "./components/MoviesSection";
import SeriesSection from "./components/SeriesSection";
import { useSection } from "./contexts/SectionContext";

function App() {
    const { activeSection } = useSection();

    return (
        <div className="bg-primary-bg min-h-dvh text-primary-text min-w-75 pb-16">
            <Header />

            <main className="max-w-300 mx-auto px-8 pt-36">
                {activeSection === "movies" ? <MoviesSection /> : <SeriesSection />}
            </main>
        </div>
    );
}

export default App;
