import './ResourcesStyles.css';
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ResourcesRow from "./ResourcesRow";

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
            <p className="add_new"><Link className="link" to='create-resource'> add new </Link></p>
            <div className="resources--row--header">
                <p> image </p>
                <p> name of resource </p>
                <p> owner </p>
            </div>
            {
                resourceMetadatas.map(resourceMetadata => {
                    return <ResourcesRow key={resourceMetadata.resourceName} resource={resourceMetadata}/>
                })
            }
        </>
    );
}

export default ResourcesList;