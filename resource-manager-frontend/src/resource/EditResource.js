import './ResourcesStyles.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import axios from 'axios';
import { setErrorMessage, setStatusMessage } from "../utils/utils";

const DEFAULT_INITIAL_DATA = () => {
    return {
        "time": new Date().getTime(),
        "blocks": [
            {
                "type": "header",
                "data": {
                    "text": "This is my awesome editor!",
                    "level": 1
                }
            },
        ]
    }
}

const EditResource = () => {

    const ejInstance = useRef();
    const [editorData, setEditorData] = useState(DEFAULT_INITIAL_DATA);
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const loginOfLoggedInUser = useSelector((state) => state.userLogin);
    const authToken = useSelector((state) => state.accessToken);

    const { userName, resourceName } = useParams();

    const dispatch = useDispatch();

    const initEditor = async () => {

        let isReadOnly = false;

        const contentOfResource = await axios.get(`http://localhost:8080/resource/api/v1/resources/${userName}/resource/${resourceName}`)
            .then((response) => response.data)
            .catch(() => {
                setErrorMessage('Resource not found', dispatch);
                navigate(`/resources/${userName}`);
            });

        if (contentOfResource) {
            setEditorData(() => contentOfResource);
        }

        if (!isAllowedToEdit()) {
            isReadOnly = true;
        }

        const editor = new EditorJS({
            holder: "editorjs_id",
            logLevel: "ERROR",
            data: contentOfResource ? contentOfResource : editorData,
            readOnly: isReadOnly,
            onReady: () => {
                ejInstance.current = editor;
            },
            onChange: async () => {
                let content = await editor.save();
                // Put your logic here to save this data to your DB
                setEditorData(content);
            },
            autofocus: true,
            tools: {
                header: Header,
            },
        });
    };

    // This will run only once
    useEffect(() => {
        if (!ejInstance.current) {
            initEditor().then();
        }
        return () => {
            ejInstance.current.destroy();
            ejInstance.current = null;
        }
    }, []);

    const isAllowedToEdit = () => isLoggedIn && loginOfLoggedInUser === userName;

    const saveTheResourceToDatabase = () => {
        // eslint-disable-next-line no-restricted-globals
        let confirmAction = confirm('Are you sure to save the resource?');
        if (!confirmAction) {
            return;
        }

        axios.put(`http://localhost:8080/resource/api/v1/resources/${userName}/resource/${resourceName}`,
            JSON.stringify(editorData),
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'text/plain'
                },
            })
            .then((_response) => {
                setStatusMessage('Saved successfully.', dispatch);
            })
            .catch((axiosError) => {
                if (!axiosError.response) {
                    setErrorMessage('Unexpected error happened', dispatch);
                }
                if (axiosError.response.status === 401) {
                    setErrorMessage('Unauthorized user. Please log in to be able to create resources.', dispatch);
                    navigate('/');
                } else if (axiosError.response.status === 403) {
                    setErrorMessage('You can not create resources for other people except yourself!', dispatch);
                } else if (axiosError.response.status === 409) {
                    setErrorMessage('You already have a resource with that name.', dispatch);
                } else {
                    setErrorMessage('Unexpected error happened', dispatch);
                }
            });
    }

    const deleteResourceFromDatabase = () => {
        // eslint-disable-next-line no-restricted-globals
        let confirmAction = confirm('Are you sure You want to delete the resource?');
        if (!confirmAction) {
            return;
        }

        axios.delete(`http://localhost:8080/resource/api/v1/resources/${userName}/resource/${resourceName}`,
            {
                headers: { 'Authorization': `Bearer ${authToken}` },
            })
            .then((_response) => {
                setStatusMessage('Deleted successfully.', dispatch);
                navigate(`/resources/${userName}`);
            })
            .catch((axiosError) => {
                if (!axiosError.response) {
                    setErrorMessage('Unexpected error happened', dispatch);
                }
                if (axiosError.response.status === 401) {
                    setErrorMessage('Unauthorized user. Please log in to be able to delete resources.', dispatch);
                    navigate('/');
                } else if (axiosError.response.status === 403) {
                    setErrorMessage('You can not delete  resources for other people except yourself!', dispatch);
                } else if (axiosError.response.status === 409) {
                    setErrorMessage('You already have a resource with that name.', dispatch);
                } else {
                    setErrorMessage('Unexpected error happened', dispatch);
                }
            });
    }


    return (
        <Fragment>
            <h2>Resource {resourceName} of user {userName}</h2>
            {
                isAllowedToEdit()
                    ? <button onClick={() => saveTheResourceToDatabase()}>Save the resource</button>
                    : ''
            }
            {
                isAllowedToEdit()
                    ? <button onClick={() => deleteResourceFromDatabase()}>Delete the resource</button>
                    : ''
            }
            <div id="editorjs_id"></div>
        </Fragment>
    );
}


export default EditResource;