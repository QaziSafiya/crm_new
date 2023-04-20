import { BASE_URL } from "../constants.js";
import axios from "axios";
const AUTH_API_URL = `${BASE_URL}/users/login`;

export async function signIn(data) {
    const response = await fetch(
        AUTH_API_URL, 
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data),
        }
    );

    const { status, results, message } = await response.json();

    if(status === 'failed') {
        throw new Error(message);
    }

    return results;
};


export async function verifyEmail({ otpId, otp, email }) {
    const response = await fetch(
        `${BASE_URL}/users/verify-email`, 
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                verification_key: otpId,
                otp,
                email,
            }),
        }
    );

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message);
    }

    const { results: { data, token, } } = result;

    return { data, token, success: true };
};

export async function signInWithEmail(credentials) {
    const response = await fetch(
        `${BASE_URL}/users/email-login`, 
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(credentials),
        }
    );

    const { status, data, message } = await response.json();

    if(status !== 'Success') {
        throw new Error(message);
    }

    return { status, data };
};