import CloseCircleIcon from "../icons/CloseCircleIcon.jsx";

export default function ErrorMessage({ message }) {
    return (
        <div className="error-message">
            <CloseCircleIcon />
            {message}
        </div>
    )
}