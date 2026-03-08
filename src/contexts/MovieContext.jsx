import { createContext, useContext, useState } from "react";
import axios from "axios";

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const [popular, setPopular] = useState([]);
    const [popularLoading, setPopularLoading] = useState(true);

    const [topRated, setTopRated] = useState([]);
    const [topRatedLoading, setTopRatedLoading] = useState(true);

    const [upcoming, setUpcoming] = useState([]);
    const [upcomingLoading, setUpcomingLoading] = useState(true);

    const [movie, setMovie] = useState(null);
    const [movieLoading, setMovieLoading] = useState(true);

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

    const fetchMovieDetails = async (id) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
            });
            setMovie(res.data);
        } finally {
            setMovieLoading(false);
        }
    };

    const value = {
        popular,
        topRated,
        upcoming,
        movie,
        popularLoading,
        topRatedLoading,
        upcomingLoading,
        movieLoading,
        activeTab,
        search,
        setActiveTab,
        setSearch,
        fetchPopular,
        fetchTopRated,
        fetchUpcoming,
        fetchMovieDetails,
    };

    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovies = () => useContext(MovieContext);
