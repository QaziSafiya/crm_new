import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth.js";
import useAuth from "../../../hooks/useAuth";

import { LibraryTable } from "./LibraryTable";
import CreateLibrary from "./CreateLibrary1.jsx";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import AddCircleIcon from "../../../components/icons/AddCircleIcon";

export default function Library() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState([]);
  const [section, setsection] = useState("");
  const [appeal, setAppeal] = useState("");
  const [subject, setSubject] = useState("");
  const [pan, setPan] = useState("");
  const [sub, setSub] = useState("");
  const [aoOrder, setAoOrder] = useState("");
  const [asYear, setAsYear] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [appType, setAppType] = useState("");
  const [filters, setFilters] = useState({
    pan: "",
    section: "",
    sub_section: "",
    subject: "",
    appeal_no: "",
    ao_order: "",
    appeal_type: "",
    assessment_year: "",
  });
  const [selectedFilter, setSelectedFilter] = useState("");
  console.log(section);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const asynFunc = async () => {
        setLoading(true);
        const response = await fetch(
          `https://api.itaxeasy.com/library/getAll`,
          {
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          }
        );

        const data = await response.json();
        console.log("all data", data);
        setPageData(data.allLibrary);
        setFilterData(data.allLibrary);

        setLoading(false);
      };
      asynFunc();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  console.log(pageData);

  const handleSearch = (e) => {
    const val = e.target.value;
    setsection(val);

    const res = filterData.filter((el, i) =>
      el.section.toLowerCase().includes(val.toLowerCase())
    );
    setPageData(res);
  };

  const handleAppeal = (e) => {
    const app = e.target.value;
    setAppeal(app);
    const res = filterData.filter((el, i) =>
      el.appeal_no.toLowerCase().includes(app.toLowerCase())
    );
    setPageData(res);
  };

  const handleSubject = (e) => {
    const sub = e.target.value;
    setSubject(sub);
    const res = filterData.filter((el, i) =>
      el.subject.toLowerCase().includes(sub.toLowerCase())
    );
    setPageData(res);
  };

  const handleAppType = (e) => {
    const typ = e.target.value;
    setAppType(typ);
    const res = filterData.filter((el, i) =>
      el.appeal_type.toLowerCase().includes(typ.toLowerCase())
    );
    setPageData(res);
  };

  const handlePan = (e) => {
    const panNo = e.target.value;
    setPan(panNo);
    const res = filterData.filter((el, i) =>
      el.pan.toLowerCase().includes(panNo.toLowerCase())
    );
    setPageData(res);
  };

  const handleSub = (e) => {
    const subType = e.target.value;
    setSub(subType);
    const res = filterData.filter((el, i) =>
      el.sub_section.toLowerCase().includes(subType.toLowerCase())
    );
    setPageData(res);
  };

  const handleAo = (e) => {
    const ao = e.target.value;
    setAoOrder(ao);
    const res = filterData.filter((el, i) =>
      el.ao_order.toLowerCase().includes(ao.toLowerCase())
    );
    setPageData(res);
  };

  const handleAsYear = (e) => {
    const as = e.target.value;
    setAsYear(as);
    const res = filterData.filter((el, i) =>
      el.assessment_year.toLowerCase().includes(as.toLowerCase())
    );
    setPageData(res);
  };

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: value,
  //   }));
  // };

  console.log(selectedFilter);
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
          <div>
            {loading ? (
              <div className="fixed inset-0 flex items-center justify-center bg-blue-200">
              {/* <div className="flex flex-col items-center"> */}
                {/* <div className="mb-4">
                  <img src="/loading.svg" alt="loading..." style={{ width: "100px" }} />
                </div> */}
                <h1 className="text-gray-800 text-xl font-semibold">Loading...</h1>
                {/* <div className="mt-4">
                  <div className="w-16 h-1 bg-primary rounded-full animate-pulse"></div>
                </div> */}
              </div>
            // </div>  
            ) : (
              <div>
                <div>
                  <h3 className="text-2xl mx-10 text-bold m-8 font-medium leading-tight text-blue-600 pl-2">
                    {" "}
                    E-Library
                  </h3>
                </div>
                {/* <div class="container mx-auto mt-8 mb-12"> */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-10 mx-4 md:mx-0">
                  <div className="md:pl-12 flex flex-col md:flex-row md:gap-3 mb-4 h-10">
                    <div className="flex items-center justify-center gap-3 mb-4 h-10">
                      <label
                        htmlFor="filter"
                        className="text-sm font-medium text-gray-600"
                      >
                        Filter:
                      </label>
                      <select
                        name="filter"
                        className="w-36 py-2 px-3 rounded-lg border-gray-300 border focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none shadow-sm"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                      >
                        <option value="type">Select Type</option>
                        <option value="pan">PAN</option>
                        <option value="section">Section</option>
                        <option value="sub_section">Sub Section</option>
                        <option value="subject">Subject</option>
                        <option value="appeal_no">Appeal No</option>
                        <option value="ao_order">AO Order</option>
                        <option value="appeal_type">Appeal Type</option>
                        <option value="assessment_year">Assessment Year</option>
                      </select>
                    </div>

                    <div class="w-11/12 text-center m-auto flex gap-3 mb-4">
                      {selectedFilter == "section" && (
                        <div>
                          <label htmlFor="">SECTION :- </label>
                          <input
                            onChange={handleSearch}
                            value={section}
                            type="text"
                            placeholder="Search For Section"
                            className="w-auto px-2 py-1 rounded-lg  border-gray-300 border focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-2 focus:outline-none "
                          />
                        </div>
                      )}

                      {selectedFilter == "appeal_no" && (
                        <div>
                          <label htmlFor="">APPEAL NO :- </label>
                          <input
                            type="text"
                            placeholder="Search For Appeal No"
                            className="w-auto px-2 py-1 border rounded-lg focus:border-2 border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={appeal}
                            onChange={handleAppeal}
                          />
                        </div>
                      )}

                      {selectedFilter == "subject" && (
                        <div>
                          <label htmlFor="">SUBJECT :- </label>
                          <input
                            type="text"
                            placeholder="Search For Subject"
                            className="w-auto px-2 py-1 border rounded-lg focus:border-2 border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={subject}
                            onChange={handleSubject}
                          />
                        </div>
                      )}

                      {selectedFilter == "appeal_type" && (
                        <div>
                          <label htmlFor="">APPEAL TYPE :- </label>
                          <input
                            type="text"
                            placeholder="Search For Appeal Type"
                            className="w-auto px-2 py-1 border rounded-lg focus:border-2 border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={appType}
                            onChange={handleAppType}
                          />
                        </div>
                      )}

                      {selectedFilter == "pan" && (
                        <div>
                          <label htmlFor="">PAN :- </label>
                          <input
                            type="text"
                            placeholder="Search For Pan"
                            className="w-auto px-2 py-1 border rounded-lg focus:border-2 border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={pan}
                            onChange={handlePan}
                          />
                        </div>
                      )}

                      {selectedFilter == "sub_section" && (
                        <div>
                          <label htmlFor="">SUB SECTION :- </label>
                          <input
                            type="text"
                            placeholder="Search For Sub-Section"
                            className="w-auto px-2 py-1 border rounded-lg focus:border-2 border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={sub}
                            onChange={handleSub}
                          />
                        </div>
                      )}

                      {selectedFilter == "ao_order" && (
                        <div>
                          <label htmlFor="">AO ORDER :- </label>
                          <input
                            type="text"
                            placeholder="Search For Ao Order"
                            className="w-auto px-2 py-1 border rounded-lg focus:border-2 border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={aoOrder}
                            onChange={handleAo}
                          />
                        </div>
                      )}

                      {selectedFilter == "assessment_year" && (
                        <div>
                          <label htmlFor="">Assessment Year :- </label>
                          <input
                            type="text"
                            placeholder="Search For Assessment year"
                            className="w-auto px-2 py-1 border rounded-lg focus:border-2 border-gray-300  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                            value={asYear}
                            onChange={handleAsYear}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right pr-16 pt-5">
                    <Link
                      to="/e-library/add-library"
                      className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      <AddCircleIcon className="mr-2 pr-2 " />
                      <p className="pl-2">Create Library</p>
                    </Link>
                  </div>
                </div>
                <div className="max-h-80 overflow-x-auto border w-full md:w-11/12 m-auto border-gray-300 rounded-lg">
                  <table class=" table-auto ">
                    <thead>
                      <tr class="bg-blue-500 sticky top-0 text-white  ">
                        <th class="sticky top-0">ID</th>
                        <th class="sticky top-0">Pan</th>
                        <th class="sticky top-0">Section</th>
                        <th class="sticky top-0">Sub Section</th>
                        <th class="sticky top-0">Subject</th>
                        <th class="sticky top-0">Judgment</th>
                        <th class="sticky top-0">Appeal No</th>
                        <th class="sticky top-0">Ao Order</th>
                        <th class="sticky top-0">Appeal Type</th>
                        <th class="sticky top-0">Assessment Year</th>

                        {/* <th class="sticky top-0">Itat No</th> */}

                        <th class="sticky top-0">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageData?.map((el, i) => {
                        return <LibraryTable index={i} {...el} />;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
