import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../../store/store-context";
import { GSTR_OBJ } from "../../../../store/actions";
import Form from "./Form";
import Details from "./Details";

const Card_One = ({ setActiveSection }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [gstrFormData, setGstrFormData] = useState([]);
  const [state, dispatch] = useContext(StoreContext);

  useEffect(() => {
    dispatch({
      action: GSTR_OBJ,
      payload: gstrFormData,
    });
  }, [gstrFormData]);

  // useEffect(() => {
  //   console.log(info);
  // }, [info])

  // useEffect(() => {
  //   gstrObj !== undefined &&
  //       gstrObj.b2b.map((item, i) => {
  //       return {
  //         gsrn: item?.ctin,
  //         invoiceNumber: item?.inv[0]?.inum,
  //         invoiceDate: item?.inv[0]?.idt,
  //         invoiceValue: item?.inv[0]?.val,
  //         pos: item?.inv[0]?.pos,
  //         tax: item?.inv[0]?.itms[0]?.itm_det?.txval,
  //         rate: item?.inv[0]?.itms[0]?.itm_det?.rt,
  //         cgst: item?.inv[0]?.itms[0]?.itm_det?.camt,
  //         sgst: item?.inv[0]?.itms[0]?.itm_det?.samt,
  //         type: item?.inv[0]?.inv_typ,
  //       };
  //     });
  //   setInfo((state) => {
  //     [...state, obj];
  //   });
  // }, [gstrObj]);

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
                <button
                  className="button is-small is-primary"
                  onClick={() => setActiveSection(null)}
                >
                  Back
                </button>
              </div>
            )}
            <div>
              {isFormOpen === true ? (
                <Form
                  setIsFormOpen={setIsFormOpen}
                  gstrFormData={gstrFormData}
                  setGstrFormData={setGstrFormData}
                />
              ) : (
                <Details />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card_One;