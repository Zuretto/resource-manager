import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../state/reducer";
import { useDispatch } from 'react-redux';
import { createRef } from 'react';
import { useSelector } from 'react-redux';

const CreateResourceForm = () => {

    const { userName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nameOfNewResourceRef = createRef();
    const imageUrlRef = createRef();

    const authToken = useSelector((state) => state.accessToken);

    const _isTextValid = (text) => text && !/\s/.test(text);

    const _setStatusMessage = (text) => {
        dispatch({ type: ACTION_TYPES.SET_STATUS_MESSAGE, payload: { statusMessage: text } });
        setTimeout(() => {
            dispatch({ type: ACTION_TYPES.SET_STATUS_MESSAGE, payload: { statusMessage: '' } });
        }, 15000);
    }

    const _setErrorMessage = (text) => {
        dispatch({ type: ACTION_TYPES.SET_ERROR_MESSAGE, payload: { errorMessage: text } });
        setTimeout(() => {
            dispatch({ type: ACTION_TYPES.SET_ERROR_MESSAGE, payload: { errorMessage: '' } });
        }, 15000);
    }

    const createNewResource = () => {
        const nameOfNewResource = nameOfNewResourceRef.current.value;
        const imageUrl = imageUrlRef.current.value;

        if (!_isTextValid(nameOfNewResource)) {
            _setErrorMessage('Invalid name of resource! Mustn\'t be blank');
            return;
        }

        axios.post(`http://localhost:8080/resource/api/v1/resources/${userName}/resource/${nameOfNewResource}`,
            null,
            {
                headers: { Authorization: `Bearer ${authToken}` },
                params: { imageUrl: imageUrl }
            })
            .then(() => {
                _setStatusMessage('New resource created. You can edit it now.');
                navigate(`/resources/${userName}/resource/${nameOfNewResource}/edit`);
            })
            .catch((error) => {
                if (!error.response) {
                    _setErrorMessage('Unexpected error happened');
                }
                if (error.response.status === 401) {
                    _setErrorMessage('Unauthorized user. Please log in to be able to create resources.');
                    navigate('/');
                } else if (error.response.status === 403) {
                    _setErrorMessage('You can not create resources for other people except yourself!');
                } else if (error.response.status === 409) {
                    _setErrorMessage('You already have a resource with that name.');
                } else {
                    _setErrorMessage('Unexpected error happened');
                }
            });
    }

    return (
        <div className="form">
            <h2> Create new resource </h2>
            <label>
                <input placeholder="name of new resource" ref={nameOfNewResourceRef}></input>
            </label>
            <label>
                <input placeholder="URL to logo of the resource" ref={imageUrlRef}></input>
            </label>
            <span>
                <button onClick={() => createNewResource()}> Create </button>
            </span>
        </div>
    );

}

export default CreateResourceForm;