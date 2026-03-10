import { useEffect } from "react";
import SeriesCard from "./SeriesCard";
import CardGridSkeleton from "./skeletons/CardGridSkeleton";
import { useSeries } from "../contexts/SeriesContext";

const SeriesCardGrid = () => {
    const { series, loading, fetchSeries, search, searchSeries, page, setPage, activeTab, totalPages, totalResults } =
        useSeries();

    const titles = {
        popular: "Popular Series",
        top_rated: "Top Rated Series",
        on_the_air: "On The Air Series",
        search: "Search Results",
    };

    useEffect(() => {
        if (activeTab === "search") {
            searchSeries();
        } else {
            fetchSeries();
        }
    }, [page, search, activeTab]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    const handleNextPage = async () => {
        setPage((prev) => prev + 1);
    };

    const handlePreviousPage = async () => {
        setPage((prev) => prev - 1);
    };

    return (
        <section className="flex flex-col gap-8">
            {loading ? (
                <CardGridSkeleton />
            ) : (
                <>
                    <h2 className="text-2xl font-bold">
                        {titles[activeTab]}
                        {activeTab === "search" && <span className="text-secundary-text">{` (${totalResults})`}</span>}
                    </h2>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-8">
                        {series.map((series) => (
                            <SeriesCard key={series.id} series={series} />
                        ))}
                    </div>

                    <div>
                        <div className="flex justify-center items-center gap-2 text-primary-text mt-12">
                            <div>
                                <button disabled={page === 1} onClick={handlePreviousPage} className="page-button">
                                    <i className="fa-solid fa-angle-left"></i>
                                </button>
                            </div>

                            <div className="flex px-2.5 py-1 border border-border rounded-lg">
                                <p className="text-center w-2.5 font-semibold">{page}</p>
                            </div>

                            <div>
                                <button disabled={page === totalPages} onClick={handleNextPage} className="page-button">
                                    <i className="fa-solid fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default SeriesCardGrid;
