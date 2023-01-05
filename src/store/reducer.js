import { AUTH_USER, LOGOUT, SET_THEME, TOGGLE_SIDEBAR } from "./actions.js";

export default function reducer(state, { type, payload }) {
    switch(type) {
        case AUTH_USER:
            return { ...state, auth: { ...state.auth, currentUser: payload.user, token: payload.token, pending: false } };
        case LOGOUT:
            return { ...state, auth: { ...state.auth, currentUser: null, token: null } };
        case TOGGLE_SIDEBAR:
            return { ...state, sidebarOpen: !state.sidebarOpen };
        case SET_THEME:
            return { ...state, theme: payload };
        default:
            return state;
    }
}