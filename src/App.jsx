import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesSection from "./components/MoviesSection";
import SeriesSection from "./components/SeriesSection";
import { useSection } from "./contexts/SectionContext";

function App() {
    const { activeSection } = useSection();

    return (
        <div className="bg-primary-bg min-h-dvh text-primary-text min-w-100">
            <Header />

            <main className="max-w-300 mx-auto px-8 max-sm:px-6 pt-34 pb-20">
                {activeSection === "movies" ? <MoviesSection /> : <SeriesSection />}
            </main>

            <Footer />
        </div>
    );
}

export default App;
