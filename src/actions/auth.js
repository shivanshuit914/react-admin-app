import axios from 'axios';

export const AUTH_USER = 'auth_user';
export const AUTH_ERROR = 'auth_error';
export const LOGOUT_USER = 'sign_out_user';
const ROOT_URL = 'http://localhost:3000';

export function loginUser({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/users/login`, {email, password})
            .then(
                response => {
                    dispatch({type: AUTH_USER});
                    localStorage.setItem('token', response.data.token);
                }
            ).catch(() => {
            dispatch(authError('Incorrect Login Details'));
        })
    }
}

export function logoutUser() {
    localStorage.removeItem('token');

    return { type: LOGOUT_USER };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}