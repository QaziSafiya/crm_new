import { useContext } from "react";
import { StoreContext } from "../../../../store/store-context";

const Details = () => {
  const [state, dispatch] = useContext(StoreContext);
  const gstrObj = state.gstr.gstrObj;

  return (
    <>
      <table className="flex-wrap overflow-hidden">
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
          {/* {gstrObj.length > 0 &&
              gstrObj.map((item, i) => {
                return (
                  <tr key={i + item}>
                    <td>{item?.Recipient}</td>
                    <td>{item?.Tade}</td>
                    <td>{item?.name}</td>
                    <td>{item?.type}</td>
                    <td>{item?.records}</td>
                    <td>{item?.Pending}</td>
                  </tr>
                );
              })} */}

          {/* {gstrObj !== undefined &&
              gstrObj.b2b.map((item, i) => {
                return (
                  <tr key={item + i}>
                    <td>{item?.ctin}</td>
                    <td>{item?.inv[0]?.inum}</td>
                    <td>{item?.inv[0]?.idt}</td>
                    <td>{item?.inv[0]?.val}</td>
                    <td>{item?.inv[0]?.pos}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.txval}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.rt}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.camt}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.samt}</td>
                    <td>{item?.inv[0]?.inv_typ}</td>
                  </tr>
                );
              })} */}

          {/* {info !== undefined &&
              info.map((item, i) => {
                return (
                  <tr key={item + i}>
                    <td>{item?.ctin}</td>
                    <td>{item?.inv[0]?.inum}</td>
                    <td>{item?.inv[0]?.idt}</td>
                    <td>{item?.inv[0]?.val}</td>
                    <td>{item?.inv[0]?.pos}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.txval}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.rt}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.camt}</td>
                    <td>{item?.inv[0]?.itms[0]?.itm_det?.samt}</td>
                    <td>{item?.inv[0]?.inv_typ}</td>
                  </tr>
                );
              })} */}
        </tbody>
      </table>
    </>
  );
};

export default Details;