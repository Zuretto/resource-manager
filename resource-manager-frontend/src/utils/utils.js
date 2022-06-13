import { ACTION_TYPES } from "../state/reducer";

export const setStatusMessage = (text, dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_STATUS_MESSAGE, payload: { statusMessage: text } });
    setTimeout(() => {
        dispatch({ type: ACTION_TYPES.SET_STATUS_MESSAGE, payload: { statusMessage: '' } });
    }, 15000);
}

export const setErrorMessage = (text, dispatch) => {
    dispatch({ type: ACTION_TYPES.SET_ERROR_MESSAGE, payload: { errorMessage: text } });
    setTimeout(() => {
        dispatch({ type: ACTION_TYPES.SET_ERROR_MESSAGE, payload: { errorMessage: '' } });
    }, 15000);
}