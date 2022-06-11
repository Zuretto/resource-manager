import { useParams } from "react-router-dom";


const ResourcesList = () => {
    const { userName } = useParams();

    return (
        <h3> Resources of user: {userName} </h3>
    );
}

export default ResourcesList;