import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import MoviesGrid from "./components/MoviesGrid";

function App() {
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const [popular, setPopular] = useState([]);
    const [popularLoading, setPopularLoading] = useState(true);

    const [topRated, setTopRated] = useState([]);
    const [topRatedLoading, setTopRatedLoading] = useState(true);

    const [upcoming, setUpcoming] = useState([]);
    const [upcomingLoading, setUpcomingLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("home");

    const fetchMovies = async (endpoint, setMovies, setLoading) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${endpoint}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
            });

            setMovies(res.data.results);
        } catch (err) {
            console.log(err.response?.data?.status_message || "Failed to fetch movies.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies("popular", setPopular, setPopularLoading);
        fetchMovies("top_rated", setTopRated, setTopRatedLoading);
        fetchMovies("upcoming", setUpcoming, setUpcomingLoading);
    }, []);

    useEffect(() => {
        if (activeTab !== "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [activeTab]);

    return (
        <div className="bg-primary-bg min-h-dvh text-primary-text min-w-75 pb-16">
            <Header setActiveTab={setActiveTab} />

            <main className="max-w-300 mx-auto px-8 pt-36">
                {activeTab === "home" ? (
                    <section className="flex flex-col gap-16">
                        <Carousel
                            movies={popular}
                            setActiveTab={setActiveTab}
                            tabName={"popular"}
                            loading={popularLoading}
                        />

                        <Carousel
                            movies={topRated}
                            setActiveTab={setActiveTab}
                            tabName={"top_rated"}
                            loading={topRatedLoading}
                        />

                        <Carousel
                            movies={upcoming}
                            setActiveTab={setActiveTab}
                            tabName={"upcoming"}
                            loading={upcomingLoading}
                        />
                    </section>
                ) : activeTab === "list" ? (
                    <div></div>
                ) : (
                    <MoviesGrid activeTab={activeTab} />
                )}
            </main>
        </div>
    );
}

export default App;
