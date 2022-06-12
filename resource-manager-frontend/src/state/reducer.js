const initialState = {
    accessToken: '',
    isLoggedIn: false,
    userLogin: '',
    statusMessage: '',
    errorMessage: ''
}

export const ACTION_TYPES = {
    LOGIN_USER: 'auth/userLoggedIn',
    SET_STATUS_MESSAGE: 'global/statusMessage',
    SET_ERROR_MESSAGE: 'global/errorMessage'
}

export default function generalReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_USER: {
            return {
                ...state,
                accessToken: action.payload.accessToken,
                userLogin: action.payload.login,
                isLoggedIn: true
            }
        }
        case ACTION_TYPES.SET_STATUS_MESSAGE: {
            return {
                ...state,
                statusMessage: action.payload.statusMessage
            }
        }

        case ACTION_TYPES.SET_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            }
        }
        default:
            return state
    }
}