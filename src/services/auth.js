import { BASE_URL } from "../constants.js";
const AUTH_API_URL = `${BASE_URL}/user/login`;

export async function verifyEmail({ otpId, otp, email }) {
    const response = await fetch(
        `${BASE_URL}/user/verify`, 
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                otp_key: otpId,
                otp,
                email,
            }),
        }
    );

    const result = await response.json();

    if(!response.ok) {
        throw new Error(result.message);
    }

    const { success, data } = result;

    const token = data.token;

    return { success, data, token };
};

export async function signInWithEmail(credentials) {
    const response = await fetch(
        AUTH_API_URL, 
        {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(credentials),
        }
    );

    const { success, otp_key, message } = await response.json();

    if(!success) {
        throw new Error(message);
    }

    return { success, otp_key, email: credentials.email };
};