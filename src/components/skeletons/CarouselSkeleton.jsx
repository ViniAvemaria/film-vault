const CarouselSkeleton = () => {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between">
                <div className="relative bg-secondary-bg rounded-lg h-8 w-50 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                </div>

                <div className="relative bg-secondary-bg rounded-lg h-8 w-20 overflow-hidden">
                    <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                </div>
            </div>

            <div className="flex gap-5 overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-3 p-3 min-w-50 bg-card-bg rounded-lg ">
                        <div className="relative bg-secondary-bg rounded-lg h-65 w-full overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>

                        <div className="relative bg-secondary-bg rounded-lg h-7 w-full overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>

                        <div className="relative bg-secondary-bg rounded-lg h-7 w-15 overflow-hidden">
                            <span className="absolute inset-0 animate-shimmer bg-linear-to-r from-transparent via-shimmer to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselSkeleton;
