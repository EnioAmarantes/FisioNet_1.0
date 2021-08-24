const INITIAL_STATE = {
    userEmail: "",
    userLoged: 0,
};

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

export default userReducer ;