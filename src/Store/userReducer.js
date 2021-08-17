const INITIAL_STATE = {
    userEmail: "",
    userLoged: 0,
};

const USER_ACTION = {
    NewLost: 0
}

function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, userLoged: 1, userEmail: action.userEmail }
        case 'LOGOUT':
            return { ...state, userLoged: 0, userEmail: null }
        default:
            return state;


    }
}

function userAction(state = USER_ACTION, action) {
    switch (action.type) {
        case 'NEW_USER':
            return { ...state, NewLost: 1 }
        case 'LOST_PASS':
            return { ...state, NewLost: 2 }
        default:
            return state;
    }
}

export { userReducer, userAction };