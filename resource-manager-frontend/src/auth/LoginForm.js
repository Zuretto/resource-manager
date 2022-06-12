import './AuthStyles.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ACTION_TYPES } from '../state/reducer';
import { createRef } from 'react';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginInputRef = createRef();
    const passwordInputRef = createRef();

    const _setErrorMessage = (text) => {
        dispatch({ type: ACTION_TYPES.SET_ERROR_MESSAGE, payload: { errorMessage: text } });
        setTimeout(() => {
            dispatch({ type: ACTION_TYPES.SET_ERROR_MESSAGE, payload: { errorMessage: '' } });
        }, 15000);
    }

    const performLogin = () => {
        const userName = loginInputRef.current.value;
        axios.get('http://localhost:8080/auth/api/v1/user',
            {
                params: {
                    login: userName,
                    password: passwordInputRef.current.value,
                },
            })
            .then((response) => {
                dispatch({
                    type: ACTION_TYPES.LOGIN_USER, payload: {
                        accessToken: response.data.access_token,
                        login: userName,
                    },
                });
                navigate(`/resources/${userName}`);
            })
            .catch((_axiosError) => {
                _setErrorMessage('Wrong credentials.');
            });
    };

    const redirectToRegister = () => {
        navigate(`/register-form`);
    }

    return (
        <div className="form">

            <label>
                <input placeholder="login" ref={loginInputRef}></input>
            </label>
            <label>
                <input type="password" placeholder="password" ref={passwordInputRef}></input>
            </label>
            <span>
                <button onClick={() => performLogin()}> Sign in </button>
                <button onClick={() => redirectToRegister()}> Register </button>
            </span>
            <span>
                Don't have an account? <Link to='/register-form'>Register</Link>.
            </span>
            <span>
                Password forgotten? <Link to='/reset-password'>Reset</Link>.
            </span>
        </div>
    );
}

export default LoginForm;
