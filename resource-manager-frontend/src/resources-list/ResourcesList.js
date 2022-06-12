import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ResourcesList = () => {

    const { userName } = useParams();
    const [resourceMetadatas, setResourceMetadatas] = useState([]);

    useEffect(() => {
            if (resourceMetadatas.length === 0) {
                fetchResources().then();
            }
        }
    )

    const fetchResources = async () => {
        const resourceMetadatas = await axios.get(`http://localhost:8080/resource/api/v1/resources/${userName}`)
            .then((response) => response.data);

        setResourceMetadatas(() => resourceMetadatas);
    }

    return (
        <>
            <h3> Resources of user: {userName} </h3>
            {
                resourceMetadatas.map(resourceMetadata => {
                    return <h2 key={resourceMetadata.resourceName}>{resourceMetadata.resourceName}</h2>
                })
            }
        </>
    );
}

export default ResourcesList;