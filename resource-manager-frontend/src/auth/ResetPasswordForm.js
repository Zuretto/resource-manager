import './AuthStyles.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { createRef } from 'react';
import { setErrorMessage, setStatusMessage } from "../utils/utils";


const ResetPasswordForm = () => {

    const navigate = useNavigate();

    const loginInputRef = createRef();
    const passwordInputRef = createRef();
    const emailInputRef = createRef();
    const favoriteCharacterInputRef = createRef();

    const dispatch = useDispatch();

    const _isTextValid = (text) => text && !/\s/.test(text);

    const performRegister = () => {
        const userName = loginInputRef.current.value;
        const password = passwordInputRef.current.value;
        const email = emailInputRef.current.value;
        const favoriteCharacter = favoriteCharacterInputRef.current.value;

        if (!_isTextValid(userName) || !password || !_isTextValid(email) || !favoriteCharacter) {
            setErrorMessage('Invalid data - please fill all input fields and do not use whitespaces on userName or email.', dispatch)
            return;
        }

        axios.patch('http://localhost:8080/auth/api/v1/user/password', null,
            {
                params: {
                    login: userName,
                    password: passwordInputRef.current.value,
                    email: email,
                    favoriteCharacter: favoriteCharacter
                },
            })
            .then((_response) => {
                setStatusMessage('Password reset successfully.', dispatch);
                navigate(`/`);
            })
            .catch((_axiosError) => {
                setErrorMessage('Login, email and favorite character does not match.', dispatch);
            });
    };

    return (
        <div className="form">
            <label>
                <input placeholder="login" ref={loginInputRef}></input>
            </label>

            <label>
                <input placeholder="email" ref={emailInputRef}></input>
            </label>
            <label>
                <input placeholder="favorite character" ref={favoriteCharacterInputRef}></input>
            </label>
            <label>
                <input type="password" placeholder="new password" ref={passwordInputRef}></input>
            </label>
            <span>
                <button onClick={() => performRegister()}> Reset password </button>
            </span>
            <span>
                <Link className="link"  to='/'>Return to login</Link>.
            </span>
            <span>
                Password forgotten? <Link className="link"  to='/reset-password'>Reset</Link>.
            </span>
        </div>
    );
}

export default ResetPasswordForm;