import CheckCircleIcon from "../icons/CheckCircleIcon.jsx";

export default function SuccessMessage({ message }) {
    return (
        <div className="success-message">
            <CheckCircleIcon />
            {message}
        </div>
    )
}