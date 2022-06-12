import './ResourcesStyles.css';
import { default as React, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import axios from 'axios';
import { ACTION_TYPES } from "../state/reducer";

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
    const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const loginOfLoggedInUser = useSelector((state) => state.userLogin);
    const authToken = useSelector((state) => state.accessToken);

    const { userName, resourceName } = useParams();

    const dispatch = useDispatch();

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

    const initEditor = async () => {

        let isReadOnly = false;

        const contentOfResource = await axios.get(`http://localhost:8080/resource/api/v1/resources/${userName}/resource/${resourceName}`)
            .then((response) => response.data);

        if (contentOfResource) {
            setEditorData(() => contentOfResource);
        }

        if (!isLoggedIn || loginOfLoggedInUser !== userName) {
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

    const saveTheResourceToDatabase = () => {
        axios.put(`http://localhost:8080/resource/api/v1/resources/${userName}/resource/${resourceName}`,
            JSON.stringify(editorData),
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'text/plain'
                },
            })
            .then((_response) => {
                _setStatusMessage('Saved successfully.');
            })
            .catch((_axiosError) => {
                _setErrorMessage('Something went wrong.');
            });
    }



    return (
        <React.Fragment>
            <h2>Resource {resourceName} of user {userName}</h2>
            <button onClick={() => saveTheResourceToDatabase()}>Save the resource </button>
            <div id="editorjs_id"></div>
        </React.Fragment>
    );
}


export default EditResource;