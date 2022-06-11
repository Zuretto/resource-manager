import './AuthStyles.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ACTION_TYPES } from '../state/reducer';
import { createRef, useState } from 'react';


const RegisterForm = () => {

    const navigate = useNavigate();

    const loginInputRef = createRef();
    const passwordInputRef = createRef();
    const emailInputRef = createRef();
    const favoriteCharacterInputRef = createRef();

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const _isTextValid = (text) => text && !/\s/.test(text);

    const _setStatusMessage = (text) => {
        dispatch({ type: ACTION_TYPES.SET_STATUS_MESSAGE, payload: { statusMessage: text } });
        setTimeout(() => {
            dispatch({ type: ACTION_TYPES.SET_STATUS_MESSAGE, payload: { statusMessage: '' } });
        }, 15000);
    }

    const performRegister = () => {
        const userName = loginInputRef.current.value;
        const password = passwordInputRef.current.value;
        const email = emailInputRef.current.value;
        const favoriteCharacter = favoriteCharacterInputRef.current.value;

        if (!_isTextValid(userName) || !password || !_isTextValid(email) || !favoriteCharacter) {
            setErrorMessage(() => 'Invalid data - please fill all input fields and do not use whitespaces on userName or email.')
            return;
        }

        axios.post('http://localhost:8080/auth/api/v1/user', null,
            {
                params: {
                    login: userName,
                    password: passwordInputRef.current.value,
                    email: email,
                    favoriteCharacter: favoriteCharacter
                },
            })
            .then((_response) => {
                _setStatusMessage('Account created.');
                navigate(`/`);
            })
            .catch((_axiosError) => {
                setErrorMessage(() => 'User with such email or login already exists.');
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
            <label>
                <input placeholder="email" ref={emailInputRef}></input>
            </label>
            <label>
                <input placeholder="favorite character" ref={favoriteCharacterInputRef}></input>
            </label>
            <span>
                <button onClick={() => performRegister()}> Register </button>
            </span>
            {
                errorMessage
                    ? (<p className="error--paragraph"> {errorMessage} </p>)
                    : ''
            }
            <span>
                <Link to='/'>Return to login</Link>.
            </span>
            <span>
                Password forgotten? <Link to='/reset-password'>Reset</Link>.
            </span>
        </div>
    );
}

export default RegisterForm;