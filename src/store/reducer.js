import { AUTH_FROM_REDIRECT, AUTH_USER, CLEAR_REDIRECT, CLOSE_SIDEBAR, GST_LOGIN, LOGOUT, OPEN_SIDEBAR, SET_DASHBOARD_DATA, SET_GST_MONTH, SET_GST_YEAR, SET_USER_DETAILS, TOGGLE_SIDEBAR, UPDATE_USER, PDF_DOC, SET_GST_QUARTER, SET_REDIRECT, GSTR_MODE, GSTR_OBJ, PDF_DOC_INVOICE, LIB_PDF_DOC } from "./actions.js";

function setStorageItem(key, value, storageType = localStorage) {
    try {
        storageType.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting session storage item: ${error.message}`);
    }
}

export default function reducer(state, { type, payload }) {
    console.log(type, payload);
    switch (type) {
        case AUTH_USER:
            setStorageItem('AUTH_USER', payload, sessionStorage);
            return { ...state, auth: { ...state.auth, currentUser: payload.user, token: payload.token, pending: false } };
        case AUTH_FROM_REDIRECT:
            return { ...state, auth: { ...state.auth, currentUser: payload.user, token: payload.token, pending: false, redirect: payload.redirect } };
        case SET_REDIRECT:
            return { ...state, auth: { ...state.auth, redirect: payload.redirect } };
        case CLEAR_REDIRECT:
            return { ...state, auth: { ...state.auth, redirect: null } };
        case UPDATE_USER:
            return { ...state, auth: { ...state.auth, currentUser: { ...state.auth.currentUser, ...payload } } };
        case LOGOUT:
            sessionStorage.removeItem('AUTH_USER');
            localStorage.removeItem('SET_DASHBOARD_DATA');
            localStorage.removeItem('SET_USER_DETAILS');
            localStorage.removeItem('GST_LOGIN');
            localStorage.removeItem('SET_GST_MONTH');
            localStorage.removeItem('SET_GST_QUARTER');
            localStorage.removeItem('SET_GST_YEAR');
            localStorage.removeItem('LIB_PDF_DOC');
            localStorage.removeItem('PDF_DOC');
            localStorage.removeItem('PDF_DOC');
            localStorage.removeItem('GSTR_MODE');
            localStorage.removeItem('GSTR_OBJ');
            return { ...state, auth: { ...state.auth, currentUser: null, token: null } };
        case TOGGLE_SIDEBAR:
            return { ...state, sidebarOpen: !state.sidebarOpen };
        case OPEN_SIDEBAR:
            return { ...state, sidebarOpen: true };
        case CLOSE_SIDEBAR:
            return { ...state, sidebarOpen: false };
        case SET_DASHBOARD_DATA:
            setStorageItem('SET_DASHBOARD_DATA', payload);
            return { ...state, dashboard: { ...state.dashboard, data: payload, loading: false } };
        case SET_USER_DETAILS:
            setStorageItem('SET_USER_DETAILS', payload);
            return { ...state, user: payload };
            case GST_LOGIN:
            setStorageItem('GST_LOGIN', payload);
            return {
                ...state,
                gst: {
                    ...state.gst,
                    party_name: payload.party_name,
                    isLoggedIn: true,
                    gstin: payload.gstin,
                    username: payload.username
                },
            };
        case SET_GST_MONTH:
            setStorageItem('SET_GST_MONTH', payload);
            return { ...state, gst: { ...state.gst, month: payload }, };
        case SET_GST_QUARTER:
            setStorageItem('SET_GST_QUARTER', payload);
            return { ...state, gst: { ...state.gst, quarter: payload } }
        case SET_GST_YEAR:
            setStorageItem('SET_GST_YEAR', payload);
            return { ...state, gst: { ...state.gst, year: payload }, };
        case LIB_PDF_DOC:
            setStorageItem('LIB_PDF_DOC', payload);
      return {
        ...state,
        libraryPdfDoc: payload,
      };
        case PDF_DOC:
            setStorageItem('PDF_DOC', payload);
            return {
                ...state,
                pdfDoc: {
                    intro: payload.intro,
                    businessName: payload.businessName,
                    pnmList: payload.pnmList,
                    owner: payload.owner,
                    rented: payload.rented,
                    loan: payload.loan,
                    data: payload.data,
                },
            };
        case GSTR_MODE:
            setStorageItem('GSTR_MODE', payload);
            return { ...state, gstr:{ mode: payload }};

        case GSTR_OBJ: 
        setStorageItem('GSTR_OBJ', payload);
            return {...state, gstr: {...state.gstr, gstrObj: payload}}
            case PDF_DOC_INVOICE:
      return {
        ...state,
        pdfDoc: {
          title: payload.title,
          column: payload.column,
          data: payload.data,
          generalData:payload.generalData,
        },
      };
        default:
            return state;
    }
}