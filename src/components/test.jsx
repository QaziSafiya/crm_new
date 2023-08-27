import { useState } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file`, file);
      });

      console.log(formData)

      const storedData = JSON.parse(localStorage.getItem("itaxData"));

      const response = await axios.post(`${BASE_URL}/documents/upload`, formData, {
        headers: {
          Authorization: `Bearer ${storedData.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Upload Files</h2>
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileChange(e)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Upload Files
        </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
