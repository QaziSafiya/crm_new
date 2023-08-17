import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants";
// import { withRouter } from "react-router-dom";
const InsForm = ({name, handleGoBack }) => {
  const [formDatanew, setFormDatanew] = useState({
    name: "",
    // email: "",
    type:"",
    mobile: "",
    address: "",
    dob: "",
    maritalStatus: "",
    gender: "",
  });
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatanew((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    const rawData = JSON.stringify(formDatanew);
    console.log(formDatanew);

    
    let token = JSON.parse(localStorage.getItem("itaxData"));
    await fetch(`${BASE_URL}/insourance/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: rawData,
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        console.log(data);
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  
  };

const storedData = JSON.parse(localStorage.getItem('itaxData'));


  return (
    <>
      <div className="container">
        {/* <Sidebar /> */}
        <div className="main">
          {/* <Topbar /> */}
          <button
          onClick={handleGoBack}
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-28 ml-9"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Go Back
        </button>
          <div className="inner-container">
            <h6 className="text-secondary">Inquery For Insurance {name}</h6>
            <div className="section">
              <form onSubmit={handleSubmit}>
                <div className="flex dir-col g-1rem">
                  <div className="field">
                    <label htmlFor="name" className="label text-primary">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="input is-small flex 1"
                      value={formDatanew.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* <div className="field ">
                    <label htmlFor="email" className="label text-primary">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="input is-small"
                      value={storedData.user.email}
                      onChange={handleChange}
                      required
                    />
                  </div> */}

                   <div className="field ">
                    <label htmlFor="email" className="label text-primary">
                      Type:
                    </label>
                    <input
                      type="text"
                      id="type"
                      name="type"
                      className="input is-small"
                      value={formDatanew.type}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="mobile" className="label text-primary">
                      Mobile:
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="input is-small "
                      value={formDatanew.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="address" className="label text-primary">
                      Address:
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      className="input is-small "
                      value={formDatanew.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="dob" className="label text-primary">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="input is-small"
                      value={formDatanew.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label
                      htmlFor="maritalStatus"
                      className="label text-primary"
                    >
                      Marital Status:
                    </label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      className="input is-small"
                      value={formDatanew.maritalStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                  <div className="field  ">
                    <label htmlFor="gender" className="label text-primary ">
                      Gender:
                    </label>
                    <div className="flex gap-5 ">
                      <label className="radio-label ">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formDatanew.gender === "male"}
                          onChange={handleChange}
                          required
                        />
                        Male
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formDatanew.gender === "female"}
                          onChange={handleChange}
                          required
                        />
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex dir-col g-1rem mt-5">
                  <button type="submit" className="button is-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InsForm;
