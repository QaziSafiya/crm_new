import ArrowLeftSIcon from "./icons/ArrowLeftSIcon.jsx";
import ArrowRightSIcon from "./icons/ArrowRightSIcon.jsx";

export default function Pagination({ currentPage, totalPages, setSearch }) {
    const setPage = page => {
        setSearch({ page });
    }

    const handlePrev = () => setPage(currentPage - 1);

    const handleNext = () => setPage(currentPage + 1);

    return (
        <div className="pagination">
            <button
                className="button pagination-button text-bold" 
                onClick={handlePrev}
                disabled={currentPage <= 0}
            >
                <ArrowLeftSIcon />
            </button>
            <span className="inline-flex text-secondary ai-center">
                ({currentPage + 1} / {totalPages})
            </span>
            <button
                className="button pagination-button text-bold" 
                onClick={handleNext}
                disabled={currentPage + 1 === totalPages}
            >
                <ArrowRightSIcon />
            </button>
        </div>
    )
}