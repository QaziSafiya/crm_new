import React, { useState } from "react";
import MenuIcon from "../../icons/MenuIcon";
import Menu from "../../Menu";

const Table_3_2 = ({ setActiveSection }) => {
  return (
    <div>
      <div className="container dir-col g-1rem">
        <div className="py text-center" style={{ "--py": "1rem" }}>
          <span>
            3.2 of the supplies shown in 3.1(a) and 3.1.1(!), details of the
            inter-state supplies made to unregistered persons, composition
            taxable person and UIN holders
          </span>
        </div>
        <div className="main px">
          <div className="inner-container">
            <Menu title={"Supplies made to unregistered person"}>
              <TableComponent />
            </Menu>
          </div>
          <div className="inner-container">
            <Menu title={"Supplies made to composition person"}>
              <TableComponent />
            </Menu>
          </div>
          <div className="inner-container">
            <Menu title={"Supplies made to UIN holder"}>
              <TableComponent />
            </Menu>
          </div>
          <div className="flex jc-center">
            <button
              onClick={() => setActiveSection(null)}
              className="button is-primary is-small"
              style={{ padding: "0 5rem" }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex dir-col g-1rem g-0_25rem-mobile">
        <div className="small-container drawer-relative p-0">
          <div
            data-open={`${isOpen ? true : false}`}
            className="flex p dir-col g-1rem mini-container"
          >
            <div
              className="flex text-small text-bold separater dir-col g-2rem margin-y"
              style={{ "--margin-y": ".75rem" }}
            >
              <div
                className="flex m-top jc-between ai-center"
                style={{ "--m-top": "4.5rem" }}
              >
                <span>Pays tax u/s 9(5)</span>
              </div>
              <div className="flex jc-between ai-center">
                <span>Registered person to pay tax u/s 9(5)</span>
              </div>
            </div>
          </div>
          <div className="w-100pc">
            <div className="flex g-1rem ai-center p-1rem flex-wrap">
              <div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="button mobile-only icon-button secondary-icon small"
                >
                  <MenuIcon />
                </button>
              </div>

              <div className="scrollable">
                <table className="flex-wrap">
                  <thead>
                    <tr>
                      <th className="py-1 p-0_25-mobile">Value</th>
                      <th className="py-1 p-0_25-mobile">Integ ₹</th>
                      <th className="py-1 p-0_25-mobile">Central ₹</th>
                      <th className="py-1 p-0_25-mobile">State/UI</th>
                      <th className="py-1 p-0_25-mobile">CESS ₹</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                      <td className="p-0_25-mobile">
                        <input type="text" className="input is-small" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table_3_2;