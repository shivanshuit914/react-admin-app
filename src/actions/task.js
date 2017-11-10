import axios from 'axios';
import {ROOT_URL} from './auth';
export const FETCH_TASKS = 'fetch_tasks';

export function fetchTasks() {
    const request = axios.get(`${ROOT_URL}/todos`, {
        headers: { authorization: localStorage.getItem('token') }
    });
    return {
        type: FETCH_TASKS,
        payload: request
    }
}