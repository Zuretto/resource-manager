import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createRef } from 'react';
import { useSelector } from 'react-redux';
import { setErrorMessage, setStatusMessage } from "../utils/utils";

const CreateResourceForm = () => {

    const { userName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const nameOfNewResourceRef = createRef();
    const imageUrlRef = createRef();

    const authToken = useSelector((state) => state.accessToken);

    const _isTextValid = (text) => text && !/\s/.test(text);

    const createNewResource = () => {
        const nameOfNewResource = nameOfNewResourceRef.current.value;
        const imageUrl = imageUrlRef.current.value;

        if (!_isTextValid(nameOfNewResource)) {
            setErrorMessage('Invalid name of resource! Mustn\'t be blank', dispatch);
            return;
        }

        axios.post(`http://localhost:8080/resource/api/v1/resources/${userName}/resource/${nameOfNewResource}`,
            null,
            {
                headers: { Authorization: `Bearer ${authToken}` },
                params: { imageUrl: imageUrl }
            })
            .then(() => {
                setStatusMessage('New resource created. You can edit it now.', dispatch);
                navigate(`/resources/${userName}/resource/${nameOfNewResource}`);
            })
            .catch((error) => {
                if (!error.response) {
                    setErrorMessage('Unexpected error happened', dispatch);
                }
                if (error.response.status === 401) {
                    setErrorMessage('Unauthorized user. Please log in to be able to create resources.', dispatch);
                    navigate('/');
                } else if (error.response.status === 403) {
                    setErrorMessage('You can not create resources for other people except yourself!', dispatch);
                } else if (error.response.status === 409) {
                    setErrorMessage('You already have a resource with that name.', dispatch);
                } else {
                    setErrorMessage('Unexpected error happened', dispatch);
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