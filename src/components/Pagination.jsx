import { useSearchParams } from "react-router-dom";
import ArrowLeftSIcon from "./icons/ArrowLeftSIcon.jsx";
import ArrowRightSIcon from "./icons/ArrowRightSIcon.jsx";

export default function Pagination({ currentPage, totalPages }) {
    const [_, setSearch] = useSearchParams();

    const setPage = page => {
        setSearch(search => ({ ...search, page }));
    };

    const handlePrev = () => setPage(currentPage - 1);

    const handleNext = () => setPage(currentPage + 1);

    return (
        <div className="pagination">
            <button
                className="button pagination-button text-bold" 
                onClick={handlePrev}
                disabled={currentPage <= 0 || totalPages === 0}
            >
                <ArrowLeftSIcon />
            </button>
            <span className="inline-flex text-secondary ai-center">
                ({totalPages === 0 ? 0 : currentPage + 1} / {totalPages})
            </span>
            <button
                className="button pagination-button text-bold" 
                onClick={handleNext}
                disabled={currentPage + 1 === totalPages || totalPages === 0}
            >
                <ArrowRightSIcon />
            </button>
        </div>
    )
}