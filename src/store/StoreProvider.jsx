import { useReducer } from "react";
import reducer from "./reducer.js";
import { StoreContext } from "./store-context.js";

export default function StoreProvider({ children }) {
    const initialState = {
        auth: {
            currentUser: null,
            token: null,
            pending: true,
        },
        user: {},
        gst: {
            party_name: '',
            isLoggedIn: false,
            gstin: null,
            username: null,
            month: 1,
            year: new Date().getFullYear()
        },
        dashboard: {
            data: {},
            loading: true,
        },
        sidebarOpen: true,
        pdfDoc: {
            intro:'',
            businessName: "",
            pnmList: [],
            owner: '',
            rented: false,
            loan: false,
            data: {},
        }
    };

    return (
        <StoreContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StoreContext.Provider>
    )
}