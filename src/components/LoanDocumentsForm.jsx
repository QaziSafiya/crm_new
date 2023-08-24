import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LOAN_TYPES } from "../pages/loan/data.js";
import { BASE_URL } from "../constants.js";
import axios from "axios";

const getRequiredDocuments = (type, salaried) =>
  LOAN_TYPES[type][salaried === "true" ? "salaried" : "nonSalaried"].documents;



const LoanDocumentsForm = ({ type, salaried }) => {
  const requiredDocuments = getRequiredDocuments(type, salaried);
  const [documents, setDocuments] = useState(
    Object.fromEntries(requiredDocuments.map((doc) => [doc, null]))
  );
  const [selectedFiles, setSelectedFiles] = useState({});

  const handleClick = async () => {
    try {
      // Retrieve the stored data from localStorage
      const storedData = JSON.parse(localStorage.getItem('itaxData'));

      // Create a new FormData object
      const formData = new FormData();

      // Append each selected file to the FormData
      for (const docType in selectedFiles) {
        if (selectedFiles.hasOwnProperty(docType)) {
          const file = selectedFiles[docType];
          if (file) {
            console.log(file)
            formData.append(docType, file);
          }
        }
      }

      console.log(formData)
      // Make a POST request to the backend API using axios
      const response = await axios.post(`${BASE_URL}/documents/upload`,formData, {
        headers: {
          'Authorization': `Bearer ${storedData.token}`,
        },
      });

      // Response data will be available in response.data
      console.log('Response:', response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  
  
  
  

  const handleDocument = (e, docType) => {
    if (e.target.files.length === 0) {
      console.log("No files selected");
      return;
    }

    // Update the selectedFiles state with the selected file
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [docType]: e.target.files[0],
    }));
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



  useEffect(() => {
    // This effect will run whenever the 'documents' state changes
    console.log("Updated documents:", documents);
  }, [documents]);

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
  accept="application/pdf"

  multiple // Add this attribute to allow multiple file selection
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
