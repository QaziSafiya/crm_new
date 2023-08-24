import React, { useState } from 'react';
import { BASE_URL } from '../../constants';
import axios from 'axios';

const PdfViewer = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  // Simulating a GET request and receiving a PDF file
  const handleGetPdf = async () => {
    const storedData = JSON.parse(localStorage.getItem('itaxData'));
    console.log(storedData.token);
      console.log("hello")
    try {
      const response = await axios.get(`${BASE_URL}/career/getCv/14`, {
        headers: {
          Authorization: `Bearer ${storedData.token}`,
        },
        // responseType: 'blob', // Specify response type as 'blob'
      });

      console.log(response)

      const pdfBlob =await response.data();
      console.log(pdfBlob);
      // Use response.data instead of response.blob()

      console.log(pdfBlob);

      // Create a URL for the Blob
      const url = URL.createObjectURL(pdfBlob);
      console.log(url);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error fetching or displaying PDF:', error);
    }
  };

  

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleGetPdf}
      >
        Get PDF
      </button>

      {pdfUrl && (
        <div className="mt-4">
          <iframe
            src={pdfUrl}
            title="PDF Viewer"
            className="w-full h-96 border"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
