import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LOAN_TYPES } from "../pages/loan/data.js";

const getRequiredDocuments = (type, salaried) =>
  LOAN_TYPES[type][salaried === "true" ? "salaried" : "nonSalaried"].documents;


  const storedData = JSON.parse(localStorage.getItem('itaxData'));

const LoanDocumentsForm = ({ type, salaried }) => {
  const requiredDocuments = getRequiredDocuments(type, salaried);
  const [documents, setDocuments] = useState(
    Object.fromEntries(requiredDocuments.map((doc) => [doc, null]))
  );
  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://api.itaxeasy.com/documents/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedData.token}`,
          },
          body: JSON.stringify(documents),
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocument = async (e, docType) => {
    if (e.target.files.length === 0) {
      return;
    }

    setDocuments({
      ...documents,
      [docType]: e.target.files[0],
    });
  };

  const handleRemoveDocument = (docType) => {
    setDocuments((prevDocuments) => {
      const updatedDocuments = { ...prevDocuments };
      delete updatedDocuments[docType];
      return updatedDocuments;
    });
  };

  const handlePreview = (docType) => {
    const file = documents[docType];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result;
        window.open(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {requiredDocuments.map((docType, idx) => (
        <div key={docType} className="mb-4 border-b border-gray-300">
          <label
            htmlFor={`requiredDocument_${idx}`}
            className="block mb-2 text-primary font-bold"
          >
            {docType}
            <br />
            <span className="ml-0 text-gray-500">(document type: PDF)</span>
          </label>

          <div className="flex items-center">
            <input
              onChange={(e) => handleDocument(e, docType)}
              id={`requiredDocument_${idx}`}
              type="file"
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
              accept="image/*,application/pdf"
            />
            {documents[docType] && (
              <>
                <FaCheck className="text-green-500 ml-2" />
                <button
                  className="text-blue-500 ml-2"
                  onClick={() => handlePreview(docType)}
                >
                  Preview
                </button>
                <button
                  className="text-red-500 ml-2"
                  onClick={() => handleRemoveDocument(docType)}
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <button className="button is-primary" onClick={handleClick}>
        Submit Documents
      </button>
    </div>
  );
};

export default LoanDocumentsForm;
