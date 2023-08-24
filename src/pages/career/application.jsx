import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailField from "../../components/DetailField.jsx";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import { postDateFormatter } from "../../lib/formatter.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { PDFDownloadLink, Page, Text, View, Document } from "@react-pdf/renderer"; // Import react-pdf components
import PdfViewer from "./test.jsx";

export default function JobApplicationDetails() {
  const { token } = useAuth();

  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);

  const navigate = useNavigate();


  // Fetch the PDF content from the URL in application.cv
 

  const fetchApplication = async () => {
    try {
      setLoading(true);
      console.log(id);

      const response = await axios.get(`${BASE_URL}/career/findOne/${id}`, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Could not fetch application.");
      }

      const application = response.data;
      console.log(application);

      setApplication(application);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const PdfDocument = () => (
    <Document>
      <Page>
        <View>
          <Text>{pdfContent}</Text>
        </View>
      </Page>
    </Document>
  );

  const handleDeleteApplication = async () => {
    try {
      const response = await fetch(`${BASE_URL}/career/delete/${id}`, {
        method: "DELETE",
        headers: new Headers({
          Authorization: `Basic ${token}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not delete application.");
      }

      // Show success toast message
      toast.success("Application deleted successfully!");
      navigate("/career");
      // Redirect to a different page or perform any necessary action
    } catch (e) {
      console.error(e);
      setError(e.message);

      // Show error toast message
      toast.error("An error occurred while deleting the application.");
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-secondary">Application Details</h6>
          {loading ? (
            <div className="flex jc-center ai-center p-1rem">
              <span className="spinner small"></span>
            </div>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="section">
              <div className="scrollable">
                <DetailField label="Name" value={application.name} />
                <DetailField
                  label="Email"
                  value={application.email}
                  type="email"
                />
                <DetailField
                  label="Mobile"
                  value={application.mobile}
                  type="phone"
                />
                <DetailField label="Address" value={application.address} />
                <DetailField
                  label="Applied on"
                  value={postDateFormatter.format(
                    new Date(application.createdAt)
                  )}
                />
                <DetailField
                  label="Last Update"
                  value={postDateFormatter.format(
                    new Date(application.updatedAt)
                  )}
                />
                <DetailField label="Skills" value={application.skills} />
                <DetailField label="Gender" value={application.gender} />
               {/* <PdfViewer /> */}
                <div className="flex g-1rem ai-center">
  <span className="label text-primary">CV</span>
  <a
    href={application.cv} // Assuming 'application.cv' contains the PDF filename
    target="_blank"
    rel="noopener noreferrer"
    className="button has-icon reveal-button is-small w-max-content"
  >
    <ViewIcon />
    View PDF
  </a>
</div>

                <div className="flex g-1rem ai-center">
                  <button
                    onClick={handleDeleteApplication}
                    className="button is-small w-max-content bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
