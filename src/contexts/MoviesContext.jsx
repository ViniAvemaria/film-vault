import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext(null);

export const MoviesProvider = ({ children }) => {
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const [popular, setPopular] = useState([]);
    const [popularLoading, setPopularLoading] = useState(true);

    const [topRated, setTopRated] = useState([]);
    const [topRatedLoading, setTopRatedLoading] = useState(true);

    const [upcoming, setUpcoming] = useState([]);
    const [upcomingLoading, setUpcomingLoading] = useState(true);

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const [movieDetails, setMovieDetails] = useState(null);
    const [movieLoading, setMovieLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [activeTab, setActiveTab] = useState("home");
    const [search, setSearch] = useState("");

    const fetchPopular = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
            });
            setPopular(res.data.results);
        } finally {
            setPopularLoading(false);
        }
    };

    const fetchTopRated = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
            });
            setTopRated(res.data.results);
        } finally {
            setTopRatedLoading(false);
        }
    };

    const fetchUpcoming = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
            });
            setUpcoming(res.data.results);
        } finally {
            setUpcomingLoading(false);
        }
    };

    const fetchMovies = async () => {
        if (activeTab === "search") return;

        setLoading(true);
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${activeTab}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: { page },
            });

            setTotalPages(res.data.total_pages);
            setMovies(res.data.results);
        } finally {
            setLoading(false);
        }
    };

    const searchMovies = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: { page, query: search },
            });

            setTotalPages(res.data.total_pages);
            setMovies(res.data.results);
        } finally {
            setLoading(false);
        }
    };

    const fetchMovieDetails = async (id) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
            });
            setMovieDetails(res.data);
            return res.data;
        } finally {
            setMovieLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab !== "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setPage(1);
        setSearch("");
    }, [activeTab]);

    const value = {
        popular,
        topRated,
        upcoming,
        movies,
        movieDetails,
        popularLoading,
        topRatedLoading,
        upcomingLoading,
        loading,
        movieLoading,
        page,
        totalPages,
        activeTab,
        search,
        setActiveTab,
        setSearch,
        setPage,
        setLoading,
        setMovieDetails,
        fetchPopular,
        fetchTopRated,
        fetchUpcoming,
        fetchMovies,
        searchMovies,
        fetchMovieDetails,
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovies = () => useContext(MovieContext);
