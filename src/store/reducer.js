import { AUTH_USER, LOGOUT, SET_DASHBOARD_DATA, SET_USER_DETAILS, TOGGLE_SIDEBAR, UPDATE_USER } from "./actions.js";

export default function reducer(state, { type, payload }) {
    switch(type) {
        case AUTH_USER:
            return { ...state, auth: { ...state.auth, currentUser: payload.user, token: payload.token, pending: false } };
        case UPDATE_USER:
            return { ...state, auth: { ...state.auth, currentUser: { ...state.auth.currentUser, ...payload } } };
        case LOGOUT:
            return { ...state, auth: { ...state.auth, currentUser: null, token: null } };
        case TOGGLE_SIDEBAR:
            return { ...state, sidebarOpen: !state.sidebarOpen };
        case SET_DASHBOARD_DATA:
            return { ...state, dashboard: { ...state.dashboard, data: payload, loading: false } };
        case SET_USER_DETAILS:
            return { ...state, user: payload };
        default:
            return state;
    }
}