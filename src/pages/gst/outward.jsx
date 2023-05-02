import { useReducer } from "react";
import HandshakeIcon from "../../components/icons/HandshakeIcon.jsx";
import UploadIcon from "../../components/icons/UploadIcon.jsx";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { Formik, Form, Field } from "formik";

const calculateTax = (turnOver, rate) => {
  let number = Number(turnOver)
  if(!(Number.isNaN(number))){
    let amount = number / 100;
    let tax = amount * rate;
    return tax / 2;
  } else {
    return 0;
  }
};

const totalTax = (values) => {
  let tax = 0;
  Object.keys(values).map((key, i) => {
    const stringRate = key.slice(-1);
    const rate = Number(stringRate);
    const turnOver = Number(values[key]);
    tax += calculateTax(turnOver, rate);
  });
  return tax.toLocaleString("en", {maximumFractionDigits: 2});
};

const totalTurnOver = (values) => {
  let total = Object.values(values).reduce(
    (acc, i) => Number(i) + acc,
    0
  )
  total = Number(total) ? total : 0;
  return total.toLocaleString("en", {maximumFractionDigits: 2});;
}

export default function OutwardSupplies() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-secondary">Outward Supplies</h6>
          <div className="flex jc-between ai-center flex-wrap g-1rem">
            <div className="flex g-1rem ai-center flex-wrap">
              <button className="button is-primary is-small has-icon">
                <UploadIcon />
                Import Excel/Tally Data
              </button>
              <button className="button is-primary is-small has-icon">
                <HandshakeIcon />
                Tally Reconcillation
              </button>
              <span className="text-secondary">Return not submitted</span>
            </div>
            <div className="flex g-1rem flex-wrap">
              <button className="button is-primary is-small has-icon">
                <ViewIcon />
                Display Form
              </button>
              <div className="flex g-1rem ai-center">
                <label htmlFor="period">Period</label>
                <select name="b" id="period" className="select w-max-content">
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="section p-0">
            <Formik
              initialValues={{
                turnOver0: 0,
                turnOver_0: 0,
                turnOver_1: 0,
                turnOver_2: 0,
                turnOver_5: 0,
              }}
            >
              {({ values }) => (
                <Form>
                  <div className="scrollable">
                    <div className="p-1rem">
                      <h6 className="text-secondary">Ledger Balances</h6>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>SN</th>
                          <th>Nature</th>
                          <th>Rate</th>
                          <th>Turn Over</th>
                          <th>CGST</th>
                          <th>SGST</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>1</th>
                          <th>
                            <span className="is-small w-100pc">
                              Intra-state supplies
                            </span>
                          </th>
                          <td>
                            <input
                              disabled
                              type="text"
                              value={0}
                              className="input is-small"
                            />
                          </td>
                          <td>
                            <Field
                              name="turnOver0"
                              type="text"
                              disabled
                              className="input is-small"
                            />
                          </td>
                          <td>
                            <input
                              value={0}
                              disabled
                              className="input is-small"
                            />
                            {/* {calculateCgst(values.turnOver_1, 0)} */}
                          </td>
                          <td>
                            <input
                              value={0}
                              disabled
                              type="text"
                              className="input is-small"
                            />
                          </td>
                          {/* <td>
                                                <input type="text" className="input is-small" />
                                            </td> */}
                        </tr>
                        <tr>
                          <th>2</th>
                          <th>
                            <span className="is-small w-100pc">
                              Intra-state supplies
                            </span>
                          </th>
                          <td>
                            <input
                              disabled
                              type="text"
                              className="input is-small"
                              value={0}
                            />
                          </td>
                          <td>
                            <Field
                              name="turnOver_0"
                              type="text"
                              className="input is-small"
                            />
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_0, 0)}
                            </span>
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_0, 0)}
                            </span>
                          </td>
                          {/* <td>
                                                <input type="text" className="input is-small" />
                                            </td> */}
                        </tr>
                        <tr>
                          <th>3</th>
                          <th>
                            <span className="is-small w-100pc">
                              Intra-state supplies
                            </span>
                          </th>
                          <td>
                            <input
                              disabled
                              type="text"
                              className="input is-small"
                              value={1}
                            />
                          </td>
                          <td>
                            <Field
                              name="turnOver_1"
                              type="text"
                              className="input is-small"
                            />
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_1, 1)}
                            </span>
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_1, 1)}
                            </span>
                          </td>
                          {/* <td>
                                                <input type="text" className="input is-small" />
                                            </td> */}
                        </tr>

                        <tr>
                          <th>4</th>
                          <th>
                            <span className="is-small w-100pc">
                              Intra-state supplies
                            </span>
                          </th>
                          <td>
                            <input
                              disabled
                              type="text"
                              className="input is-small"
                              value={2}
                            />
                          </td>
                          <td>
                            <Field
                              name="turnOver_2"
                              type="text"
                              className="input is-small"
                            />
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_2, 2)}
                            </span>
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_2, 2)}
                            </span>
                          </td>
                          {/* <td>
                                                <input type="text" className="input is-small" />
                                            </td> */}
                        </tr>

                        <tr>
                          <th>5</th>
                          <th>
                            <span className="is-small w-100pc">
                              Intra-state Supplies
                            </span>
                          </th>
                          <td>
                            <input
                              disabled
                              type="text"
                              className="input is-small"
                              value={5}
                            />
                          </td>
                          <td>
                            <Field
                              name="turnOver_5"
                              type="text"
                              className="input is-small"
                            />
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_5, 5)}
                            </span>
                          </td>
                          <td>
                            <span className="total">
                              {calculateTax(values.turnOver_5, 5)}
                            </span>
                          </td>
                          {/* <td>
                                                <input type="text" className="input is-small" />
                                            </td> */}
                        </tr>

                        <tr>
                          <th></th>
                          <th>Total :</th>
                          <td></td>
                          <td>
                            <span className="total">
                              {totalTurnOver(values)}
                            </span>
                          </td>
                          <td>
                            <span className="total">{totalTax(values)}</span>
                          </td>
                          <td>
                            <span className="total">{totalTax(values)}</span>
                          </td>
                        </tr>

                        {/* <tr>
                                            <th>6</th>
                                            <th>
                                                <button className="button is-primary is-small w-100pc">
                                                   Document Issued in Period
                                                </button>
                                            </th>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                            <td>
                                                <input type="text" className="input is-small" />
                                            </td>
                                        </tr> */}

                        {/* <tr className="bordered text-center">
                                            <th></th>
                                            <th>
                                                Outward Supplies and GST (1 + 2 + 3 + 4 + 5):
                                            </th>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                        </tr>
                                        <tr className="bordered text-center">
                                            <th className="text-secondary">
                                                Less:
                                            </th>
                                            <th>
                                                Supply attracting reverse charge (invoice)
                                            </th>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                        </tr>
                                        <tr className="bordered text-center">
                                            <th className="text-secondary">
                                                Add/Less:
                                            </th>
                                            <th>
                                            Supply attracting reverse charge (notes)
                                            </th>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                        </tr>
                                        <tr className="bordered text-center">
                                            <th></th>
                                            <th>
                                                Tax Liability on Outward (A)
                                            </th>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                        </tr>
                                        <tr className="bordered text-center">
                                            <th></th>
                                            <th>
                                                As Per GSTR-3B
                                            </th>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                            <td>
                                                0
                                            </td>
                                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}