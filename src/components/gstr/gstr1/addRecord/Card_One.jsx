import React, { useState } from "react";

const Card_One = ({setActiveSection}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [info, setInfo] = useState([]);
  return (
    <>
      <div className="inner-container">
        <div className="flex flex-wrap jc-center text-center g-2rem">
          <div>
            {!isFormOpen && (
              <div className="flex g-1rem jc-between py-1">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="button is-small is-primary"
                >
                  Add record
                </button>
                <h4>Record Details</h4>
                <button className="button is-small is-primary" onClick={() => setActiveSection(null)}>Back</button>
              </div>
            )}
            <div>
              {isFormOpen === true ? (
                <Form
                  setIsFormOpen={setIsFormOpen}
                  info={info}
                  setInfo={setInfo}
                />
              ) : (
                <Details info={info} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card_One;

const Form = ({ setIsFormOpen, info, setInfo }) => {
  const handleChange = (e) => {
    setInfo((info) => {
      return [...info, { [e.target.name]: e.target.value }];
    });
    console.log(info);
  };

  return (
    <div className="flex dir-col g-1rem">
      <div className="flex g-2rem jc-between p-2rem">
      <table className="flex-wrap">
        <thead>
          <tr>
            <th className="py-1 p-0_25-mobile">SR No.</th>
            <th className="py-1 p-0_25-mobile">Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-0_25-mobile">GSRN</td>
            <td className="p-0_25-mobile">
              <input name="gsrn" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">POS</td>
            <td className="p-0_25-mobile">
              <input name="pos" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">Invoice Number</td>
            <td className="p-0_25-mobile">
              <input name="invoiceNumber" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">Invoice Date</td>
            <td className="p-0_25-mobile">
              <input name="invoiceDate" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">Invoice Value</td>
            <td className="p-0_25-mobile">
              <input name="invoiceValue" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
        </tbody>
      </table>
      <table className="flex-wrap">
        <thead>
          <tr>
            <th className="py-1 p-0_25-mobile">SR No.</th>
            <th className="py-1 p-0_25-mobile">Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-0_25-mobile">CGST</td>
            <td className="p-0_25-mobile">
              <input name="cgst" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">SGST</td>
            <td className="p-0_25-mobile">
              <input name="sgst" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">Rate</td>
            <td className="p-0_25-mobile">
              <input name="rate" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">Nature</td>
            <td className="p-0_25-mobile">
              <input name="nature" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
          <tr>
            <td className="p-0_25-mobile">Source</td>
            <td className="p-0_25-mobile">
              <input name="source" type="text" className="input is-small" onChange={(e) => handleChange(e)} />
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <button
        className="button w-320px mx-auto is-small is-primary"
        onClick={() => setIsFormOpen(false)}
      >
        Save & exit
      </button>
    </div>
  );
};

const Details = ({ info }) => {
  return (
    <>
      <table className="flex-wrap">
        <thead>
          <tr>
            <th className="py-1 p-0_25-mobile">Recipient details</th>
            <th className="py-1 p-0_25-mobile">Tade/Legal name</th>
            <th className="py-1 p-0_25-mobile">Taxpayer name</th>
            <th className="py-1 p-0_25-mobile">Taxpayer type</th>
            <th className="py-1 p-0_25-mobile">Processed records</th>
            <th className="py-1 p-0_25-mobile">Pending/Errored</th>
          </tr>
        </thead>
        <tbody>
          {info.length > 0 &&
            info.map((item, i) => {
              return (
                <tr key={i + item}>
                  <td>{item.Recipient}</td>
                  <td>{item.Tade}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.records}</td>
                  <td>{item.Pending}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};