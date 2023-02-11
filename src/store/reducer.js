import { AUTH_FROM_REDIRECT, AUTH_USER, CLEAR_REDIRECT, CLOSE_SIDEBAR, GST_LOGIN, LOGOUT, OPEN_SIDEBAR, SET_DASHBOARD_DATA, SET_GST_MONTH, SET_GST_YEAR, SET_USER_DETAILS, TOGGLE_SIDEBAR, UPDATE_USER } from "./actions.js";

export default function reducer(state, { type, payload }) {
    switch(type) {
        case AUTH_USER:
            return { ...state, auth: { ...state.auth, currentUser: payload.user, token: payload.token, pending: false } };
        case AUTH_FROM_REDIRECT:
            return { ...state, auth: { ...state.auth, currentUser: payload.user, token: payload.token, pending: false, redirect: payload.redirect } };
        case CLEAR_REDIRECT:
            return { ...state, auth: { ...state.auth, redirect: null } };
        case UPDATE_USER:
            return { ...state, auth: { ...state.auth, currentUser: { ...state.auth.currentUser, ...payload } } };
        case LOGOUT:
            return { ...state, auth: { ...state.auth, currentUser: null, token: null } };
        case TOGGLE_SIDEBAR:
            return { ...state, sidebarOpen: !state.sidebarOpen };
        case OPEN_SIDEBAR:
            return { ...state, sidebarOpen: true };
        case CLOSE_SIDEBAR:
            return { ...state, sidebarOpen: false };
        case SET_DASHBOARD_DATA:
            return { ...state, dashboard: { ...state.dashboard, data: payload, loading: false } };
        case SET_USER_DETAILS:
            return { ...state, user: payload };
        case GST_LOGIN:
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
            return { ...state, gst: { ...state.gst, month: payload }, };
        case SET_GST_YEAR:
            return { ...state, gst: { ...state.gst, year: payload }, };
        default:
            return state;
    }
}