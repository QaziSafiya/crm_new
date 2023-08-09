import React, { useState } from "react";
// import { token } from "../../env";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
// import { token } from "../../../constants";
import useAuth from "../../../hooks/useAuth";


const CreateLibrary1 = () => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    pan: "",
    section: "",
    sub_section: "",
    subject: "",
    ao_order: "",
    itat_no: "",
    bench: "",
    appeal_no: "",
    appellant: "",
    respondent: "",
    appeal_type: "",
    appeal_filed_by: "",
    order_result: "",
    tribunal_order_date: "",
    assessment_year: "",
    judgment: "",
    conclusion: "",
    download: "", // Assuming this is a default value
    upload: "", // Assuming this is a default value
  });
  const [panError, setPanError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'pan') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.toUpperCase(),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  
    setPanError('');
  };
  

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };
   
  const handlePanBlur = () => {
    setLoading(true); // Start loading indicator
    if (!validatePAN(formData.pan)) {
      setPanError(
        'PAN should be 10 characters long and consist of uppercase letters and numbers.'
      );
    } else {
      setPanError('');
    }
    setLoading(false); // Stop loading indicator after check
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

     console.log("hello")
     if (!validatePAN(formData.pan)) {
      setPanError('PAN should be 10 characters long and consist of uppercase letters and numbers.');
      return;
    }
    console.log(formData);
    const apiUrl = "https://api.itaxeasy.com/library/create";

    await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
    <Sidebar />
    <div className="main">
      <Topbar />
      <div className="inner-container w-full">
    <div className="bg-white p-4">
      <h1 className="text-2xl mb-4 text-center">E-Library Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4 pl-32 pr-32">
        <div>
        <label htmlFor="pan" className="block mb-2 text-primary font-bold">
          PAN:
        </label>
        <input
          type="text"
          id="pan"
          name="pan"
          value={formData.pan}
          onChange={handleInputChange}
          onBlur={handlePanBlur} // Trigger authenticity check on blur
          className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {panError && <p className="text-red-500">{panError}</p>}
      </div>

          <div>
            <label htmlFor="section" className="block mb-2 text-primary font-bold">
              Section:
            </label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="sub_section" className="block mb-2 text-primary font-bold">
              Sub-Section:
            </label>
            <input
              type="text"
              id="sub_section"
              name="sub_section"
              value={formData.sub_section}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-2 text-primary font-bold">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="ao_order" className="block mb-2 text-primary font-bold">
              AO Order:
            </label>
            <input
              type="text"
              id="ao_order"
              name="ao_order"
              value={formData.ao_order}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="itat_no" className="block mb-2 text-primary font-bold">
              ITAT No:
            </label>
            <input
              type="text"
              id="itat_no"
              name="itat_no"
              value={formData.itat_no}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bench" className="block mb-2 text-primary font-bold">
              Bench:
            </label>
            <input
              type="text"
              id="bench"
              name="bench"
              value={formData.bench}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="appeal_no" className="block mb-2 text-primary font-bold">
              Appeal No:
            </label>
            <input
              type="text"
              id="appeal_no"
              name="appeal_no"
              value={formData.appeal_no}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="appellant" className="block mb-2 text-primary font-bold">
              Appellant:
            </label>
            <input
              type="text"
              id="appellant"
              name="appellant"
              value={formData.appellant}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="respondent" className="block mb-2 text-primary font-bold">
              Respondent:
            </label>
            <input
              type="text"
              id="respondent"
              name="respondent"
              value={formData.respondent}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="appeal_type" className="block mb-2 text-primary font-bold">
              Appeal Type:
            </label>
            <input
              type="text"
              id="appeal_type"
              name="appeal_type"
              value={formData.appeal_type}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="appeal_filed_by" className="block mb-2 text-primary font-bold">
              Appeal Filed By:
            </label>
            <input
              type="text"
              id="appeal_filed_by"
              name="appeal_filed_by"
              value={formData.appeal_filed_by}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="order_result" className="block mb-2 text-primary font-bold">
              Order Result:
            </label>
            <input
              type="text"
              id="order_result"
              name="order_result"
              value={formData.order_result}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tribunal_order_date" className="block mb-2 text-primary font-bold">
              Tribunal Order Date:
            </label>
            <input
              type="date"
              id="tribunal_order_date"
              name="tribunal_order_date"
              value={formData.tribunal_order_date}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="assessment_year" className="block mb-2 text-primary font-bold">
              Assessment Year:
            </label>
            <input
              type="text"
              id="assessment_year"
              name="assessment_year"
              value={formData.assessment_year}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="judgment" className="block mb-2 text-primary font-bold">
              Judgment:
            </label>
            <input
              type="text"
              id="judgment"
              name="judgment"
              value={formData.judgment}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="conclusion" className="block mb-2 text-primary font-bold">
              Conclusion:
            </label>
            <input
              type="text"
              id="conclusion"
              name="conclusion"
              value={formData.conclusion}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="download" className="block mb-2 text-primary font-bold">
              Download:
            </label>
            <input
              type="text"
              id="download"
              name="download"
              value={formData.download}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="upload" className="block mb-2 text-primary font-bold">
              Upload:
            </label>
            <input
              type="text"
              id="upload"
              name="upload"
              value={formData.upload}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          {loading && (
        <div className="mt-4 text-center text-gray-600">
          Checking PAN authenticity...
        </div>
      )}
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default CreateLibrary1;
