import { useState } from "react";

const Form = ({ setIsFormOpen, gstrFormData, setGstrFormData }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData(() => {
      return { ...formData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = () => {
    setGstrFormData([...gstrFormData, formData]);
    setIsFormOpen(false);
    console.log(formData)
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
                <input
                  name="gsrn"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">POS</td>
              <td className="p-0_25-mobile">
                <input
                  name="pos"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">Invoice Number</td>
              <td className="p-0_25-mobile">
                <input
                  name="invoiceNumber"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">Invoice Date</td>
              <td className="p-0_25-mobile">
                <input
                  name="invoiceDate"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">Invoice Value</td>
              <td className="p-0_25-mobile">
                <input
                  name="invoiceValue"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
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
                <input
                  name="cgst"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">SGST</td>
              <td className="p-0_25-mobile">
                <input
                  name="sgst"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">Rate</td>
              <td className="p-0_25-mobile">
                <input
                  name="rate"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">Nature</td>
              <td className="p-0_25-mobile">
                <input
                  name="nature"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-0_25-mobile">Source</td>
              <td className="p-0_25-mobile">
                <input
                  name="source"
                  type="text"
                  className="input is-small"
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        className="button w-320px mx-auto is-small is-primary"
        onClick={() => handleSubmit()}
      >
        Save & exit
      </button>
    </div>
  );
};

export default Form;