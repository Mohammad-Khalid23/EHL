import ActionTypes from '../constant/auth';

const INITIAL_STATE = {
    user: {
        username: '',
        email: ''
    },
    count: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.user:
            return ({
                ...state,
                username: action.payload.username,
                email: action.payload.email
            })
        case ActionTypes.counter:
            return ({
                ...state,
                count: action.payload.count,
            })
        default:
            return state;
    }

}