import { useTranslation } from "react-i18next";

const Loading = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center gap-4 border border-border py-6 px-8 rounded-lg bg-card-bg m-auto">
            <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-medium">{`${t("loading")}...`}</span>
        </div>
    );
};

export default Loading;
