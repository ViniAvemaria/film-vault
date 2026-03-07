const MoviesGridSkeleton = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="relative bg-secundary-bg rounded-lg h-10 w-50 overflow-hidden">
                <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center gap-8">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-2 justify-between max-w-75 w-full bg-card-bg rounded-lg p-4"
                    >
                        <div className="relative bg-secundary-bg rounded-lg h-80 w-full overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>

                        <div className="relative bg-secundary-bg rounded-lg h-7 w-full overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>

                        <div className="relative bg-secundary-bg rounded-lg h-7 w-15 overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesGridSkeleton;
