const initialState = {
    accessToken: '',
    isLoggedIn: false
}

export const ACTION_TYPES = {
    LOGIN_USER: 'auth/userLoggedIn'
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_USER: {
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userLogin: action.payload.login,
                isLoggedIn: true
            }
        }
        default:
            return state
    }
}