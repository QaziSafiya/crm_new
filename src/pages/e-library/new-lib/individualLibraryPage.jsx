import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { css } from "styled-components";
// import { useAuth } from "../../hooks/useAuth.js";
import useAuth from "../../../hooks/useAuth";
// import {token} from "../../../constants.js"


import { PdfDownloadButton } from "./PdfDownloadbtn";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";

const TableData = styled.p`
  font-size: 18px;
  font-weight: bold;
  border: 0.1px solid grey;

  max-width: 500px;
  min-width: 500px;
  padding: 5px 10px;
  @media (max-width: 500px) {
    font-size: 14px;
    max-width: 200px;
    min-width: 200px;
  }
  ${(props) =>
    props.scrollable &&
    css`
      max-height: 250px;
      overflow: scroll;
    `}
`;
const TableHeading = styled.h4`
  font-size: 20px;
  background-color: blue;
  color: white;
  padding: 5px 10px;
  font-weight: 600;
  max-width: 200px;
  min-width: 200px;
  @media (max-width: 500px) {
    font-size: 14px;
    max-width: 100px;
    min-width: 100px;
  }
  border: 0.1px solid grey;
`;
const TableRow = styled.div`
  display: flex;
`;

export default function IndividualLibraryPage() {
  const { token } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const asynFunc = async () => {
        setLoading(true);

        // let token = JSON.parse(localStorage.getItem("itaxData"))?.token;
        console.log(id)
        const response = await fetch(
          `https://api.itaxeasy.com/library/getOne/${id}`,
          {
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          }
        );

        const data = await response.json();
        console.log("data", data);
        setPageData(data);
        setLoading(false);
      };

      asynFunc();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `https://api.itaxeasy.com/library/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Data successfully deleted from the API.");
        navigate("/e-library");
      } else {
        console.error("Error deleting data from the API.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDataChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `https://api.itaxeasy.com/library/update/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data successfully updated in the API.");
        setPageData((prevData) => ({
          ...prevData,
          ...updatedData,
        }));
        setIsEditMode(false);
      } else {
        console.error("Error updating data in the API.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
          <div>
            {loading ? (
              <div className="fixed h-screen w-screen bg-white flex items-center justify-center">
                <img src="/loading.svg" alt="loading..." style={{ width: "100px" }} />
              </div>
            ) : (
              <div className="flex flex-col mb-10 m-auto gap-5">
                <h1 className="text-center text-2xl my-5 font-semibold text-[#2a275c] pt-5">
                  Case Details
                </h1>
                <div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white ">
                        PAN
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.pan || pageData?.pan}
                          onChange={(e) =>
                            handleUpdateDataChange("pan", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.pan}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Section
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.section || pageData?.section}
                          onChange={(e) =>
                            handleUpdateDataChange("section", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.section}</TableData>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Subject
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.subject || pageData?.subject}
                          onChange={(e) =>
                            handleUpdateDataChange("subject", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.subject}</TableData>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Ao-Order
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.ao_order || pageData?.ao_order}
                          onChange={(e) =>
                            handleUpdateDataChange("ao_order", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.ao_order}</TableData>
                      )}
                    </TableRow>
                    {/* Repeat the pattern for other fields */}
                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        ITAT No.
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.itat_no || pageData?.itat_no}
                          onChange={(e) =>
                            handleUpdateDataChange("itat_no", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.itat_no}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        RSA No.
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.rsa_no || pageData?.rsa_no}
                          onChange={(e) =>
                            handleUpdateDataChange("rsa_no", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.rsa_no}</TableData>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Appeal No.
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.appeal_no || pageData?.appeal_no}
                          onChange={(e) =>
                            handleUpdateDataChange("appeal_no", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.appeal_no}</TableData>
                      )}
                    </TableRow>
                    {/* Repeat the pattern for other fields */}
                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Sub Section
                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.sub_section || pageData?.sub_section}
                          onChange={(e) =>
                            handleUpdateDataChange("sub_section", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.sub_section}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Appeal Type

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.appeal_type
                            || pageData?.appeal_type
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("appeal_type", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.appeal_type}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Appellant

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.appellant
                            || pageData?.appellant
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("appellant", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.appellant}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Bench

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.bench
                            || pageData?.bench
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("bench", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.bench}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Tribunal Order Ddate

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.tribunal_order_date
                            || pageData?.tribunal_order_date
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("tribunal_order_date", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.tribunal_order_date}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Assessment Year

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.assessment_year
                            || pageData?.assessment_year
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("assessment_year", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.assessment_year}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Upload

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.upload
                            || pageData?.upload
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("upload", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.upload}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Updated At

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.updatedAt
                            || pageData?.updatedAt
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("updatedAt", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.updatedAt}</TableData>
                      )}
                    </TableRow>

                    <TableRow>
                      <TableHeading className="bg-blue-300 text-white">
                        Judgment

                      </TableHeading>
                      {isEditMode ? (
                        <input
                          type="text"
                          value={updatedData?.judgment
                            || pageData?.judgment
                          }
                          onChange={(e) =>
                            handleUpdateDataChange("judgment", e.target.value)
                          }
                          className="border rounded px-3 py-2"
                        />
                      ) : (
                        <TableData>{pageData?.judgment}</TableData>
                      )}
                    </TableRow>
                    {/* ... repeat for other fields ... */}
                  </div>
                </div>
                <div className="flex justify-between items-center w-1/2 m-auto mt-8">
                  <div className="flex justify-center">
                    <PdfDownloadButton pageData={pageData} />
                  </div>
                  {!isEditMode ? (
                    <button
                      onClick={() => setIsEditMode(true)}
                      className="px-2 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-4"
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-4"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditMode(false)}
                        className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-4"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-4"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
