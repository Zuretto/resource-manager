import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ACTION_TYPES } from '../state/reducer';
import { createRef, useState } from 'react';

const LoginForm = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const loginInputRef = createRef();
    const passwordInputRef = createRef();

    const [errorMessage, setErrorMessage] = useState('');

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
                navigate(`resources/${userName}`);
            })
            .catch((_axiosError) => {
                setErrorMessage(() => 'Wrong credentials.');
            });
    };

    return (
        <div className="login--form">
            <label>
                <input placeholder="login" ref={loginInputRef}></input>
            </label>
            <label>
                <input type="password" placeholder="password" ref={passwordInputRef}></input>
            </label>
            <span>
        <button onClick={() => performLogin()}> Sign in </button>
      </span>
            {errorMessage && (
                <p className="error--paragraph"> {errorMessage} </p>
            )}
            {/* <span>
                <Link to='resources/user'>halo</Link>
            </span>*/}
        </div>
    );
}

export default LoginForm;
