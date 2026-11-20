import axios from "axios";
import api from './Api.js';

// login 
export function login(credentials) {
    return api.post("/api/auth/login", credentials)
}

// save session
export function saveSession(user) {
    sessionStorage.setItem("sessionId", JSON.stringify(user))
}

// getSession
export function getSession() {
    const session = sessionStorage.getItem("sessionId")
    return session ? JSON.parse(session) : null;
}

// clear seesion
 export function clearSession()
 {
    sessionStorage.removeItem("sessionId");
 }

 // logout
export function logout() {
    return api.post("/api/auth/logout")
}
