import { BASE_URL } from "../constants.js";
import axios from "axios";
const AUTH_API_URL = `${BASE_URL}/users/login`;

export async function signIn(data) {

    const response = await axios.post(AUTH_API_URL,{
        email:data.email,
        password:data.password
    })


    const { status, results, message } =  response.data

    if(status === 'failed') {
        throw new Error(message);
    }

    return results;
};