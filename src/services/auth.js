import { BASE_URL } from "../constants.js";

const AUTH_API_URL = `${BASE_URL}/users/login`;

export async function signIn(data) {
    const response = await fetch(
        AUTH_API_URL, 
        {
            method: 'POST',
            body: data,
        }
    );

    const { status, results, message } = await response.json();

    if(status === 'failed') {
        throw new Error(message);
    }

    return results;
};