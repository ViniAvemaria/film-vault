import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SeriesContext = createContext(null);

export const SeriesProvider = ({ children }) => {
    const API_KEY = import.meta.env.VITE_TMDB_KEY;

    const [popular, setPopular] = useState([]);
    const [popularLoading, setPopularLoading] = useState(true);

    const [topRated, setTopRated] = useState([]);
    const [topRatedLoading, setTopRatedLoading] = useState(true);

    const [onAir, setOnAir] = useState([]);
    const [onAirLoading, setOnAirLoading] = useState(true);

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    const [seriesDetails, setSeriesDetails] = useState(null);
    const [seriesLoading, setSeriesLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    const [activeTab, setActiveTab] = useState("home");
    const [search, setSearch] = useState("");

    const { i18n } = useTranslation();

    const fetchPopular = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/tv/popular`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: {
                    language: i18n.language,
                },
            });
            setPopular(res.data.results);
        } finally {
            setPopularLoading(false);
        }
    };

    const fetchTopRated = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/tv/top_rated`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: {
                    language: i18n.language,
                },
            });
            setTopRated(res.data.results);
        } finally {
            setTopRatedLoading(false);
        }
    };

    const fetchOnAir = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: {
                    language: i18n.language,
                },
            });
            setOnAir(res.data.results);
        } finally {
            setOnAirLoading(false);
        }
    };

    const fetchSeries = async () => {
        if (activeTab === "search") return;

        setLoading(true);
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/tv/${activeTab}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: { page, language: i18n.language },
            });
            setTotalPages(res.data.total_pages);
            setSeries(res.data.results);
        } finally {
            setLoading(false);
        }
    };

    const searchSeries = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: { page, query: search, language: i18n.language },
            });
            setTotalResults(res.data.total_results);
            setTotalPages(res.data.total_pages);
            setSeries(res.data.results);
        } finally {
            setLoading(false);
        }
    };

    const fetchSeriesDetails = async (id) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
                headers: { Authorization: `Bearer ${API_KEY}` },
                params: {
                    language: i18n.language,
                },
            });
            setSeriesDetails(res.data);
            return res.data;
        } finally {
            setSeriesLoading(false);
        }
    };

    const value = {
        popular,
        topRated,
        onAir,
        series,
        seriesDetails,
        popularLoading,
        topRatedLoading,
        onAirLoading,
        loading,
        seriesLoading,
        page,
        totalPages,
        activeTab,
        search,
        totalResults,
        setActiveTab,
        setSearch,
        setPage,
        setLoading,
        setSeriesDetails,
        fetchPopular,
        fetchTopRated,
        fetchOnAir,
        fetchSeries,
        searchSeries,
        fetchSeriesDetails,
    };

    return <SeriesContext.Provider value={value}>{children}</SeriesContext.Provider>;
};

export const useSeries = () => useContext(SeriesContext);
