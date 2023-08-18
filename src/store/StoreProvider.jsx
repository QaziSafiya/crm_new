import { useReducer } from "react";
import reducer from "./reducer.js";
import { StoreContext } from "./store-context.js";

function getStoragedItem(key, storageType = localStorage) {
    try {
      const value = storageType.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting session storage item: ${error.message}`);
      return null;
    }
}
  
  const storedAuth = getStoragedItem("AUTH_USER");
  const storedUserDetails = getStoragedItem("SET_USER_DETAILS");
  const storedLibPdfDoc = getStoragedItem("LIB_PDF_DOC");
  const storedGstLogin = getStoragedItem("GST_LOGIN");
  const storedGstMonth = getStoragedItem("SET_GST_MONTH");
  const storedGstQuater = getStoragedItem("SET_GST_QUARTER");
  const storedGstYear = getStoragedItem("SET_GST_YEAR");
  const storedDashboardData = getStoragedItem("SET_DASHBOARD_DATA");
  const storedPDF_DOC = getStoragedItem("PDF_DOC");
  const storedGSTR_MODE = getStoragedItem("GSTR_MODE");
  const storedGSTR_OBJ = getStoragedItem("GSTR_OBJ");
  
export default function StoreProvider({ children }) {
    const initialState = {
        auth: {
            currentUser: storedAuth ? storedAuth.user : null,
            token: storedAuth ? storedAuth.token : null,
            pending: true,
        },
        user: storedUserDetails ? storedUserDetails : {},
        libraryPdfDoc: storedLibPdfDoc? storedLibPdfDoc : null,
        gst: {
            party_name: storedGstLogin? storedGstLogin.party_name : '',
            isLoggedIn: false,
            gstin:storedGstLogin ? storedGstLogin.gstin : null,
            username: storedGstLogin? storedGstLogin.username : null,
            month: storedGstMonth? storedGstMonth : null,
            quarter: storedGstQuater? storedGstQuater : 1,
            year: storedGstYear? storedGstYear : new Date().getFullYear()
        },
        dashboard: {
            data: storedDashboardData? storedDashboardData : {},
            loading: true,
        },
        sidebarOpen: true,
        pdfDoc: {
            intro: storedPDF_DOC? storedPDF_DOC.intro : '',
            businessName: storedPDF_DOC? storedPDF_DOC.businessName:"",
            pnmList: storedPDF_DOC? storedPDF_DOC.pnmList :[],
            owner: storedPDF_DOC? storedPDF_DOC.owner : '',
            rented: false,
            loan: false,
            data: storedPDF_DOC? storedPDF_DOC.data : {},
        },
        gstr: {
            mode: storedGSTR_MODE? storedGSTR_MODE : "offline",
            gstrObj: storedGSTR_OBJ? storedGSTR_OBJ : [{}],
        }
    };

    return (
        <StoreContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StoreContext.Provider>
    )
}