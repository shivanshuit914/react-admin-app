import {AUTH_USER, AUTH_ERROR, LOGOUT_USER} from '../actions/auth';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            return {...state, error : '', authenticated: true};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case LOGOUT_USER:
            return {...state, authenticated: false}
        default:
            return state;
    }
}