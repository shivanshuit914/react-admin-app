import {FETCH_TASKS} from '../actions/task'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_TASKS:
            return action.payload.data.todos;
        default:
            return state;
    }
}