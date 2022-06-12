import './ResourcesStyles.css';
import { useNavigate } from 'react-router-dom';

const ResourcesRow = (props) => {

    const navigate = useNavigate();

    const redirectToPage = () => {
        navigate(`/resources/${props.resource.resourceOwner}/resource/${props.resource.resourceName}/edit`);
    }

    return (

        <div className="resources--row--container" onClick={() => redirectToPage()}>
            {   props.resource.imageUrl
                ? <img src={props.resource.imageUrl} alt="" height="32px" width="32px"/>
                : <img src="https://img.freepik.com/darmowe-ikony/x-symbol_318-1407.jpg?w=2000" alt="" height="32px" width="32px"/>
            }
            <p> {props.resource.resourceName} </p>
            <p> {props.resource.resourceOwner}</p>
        </div>
    );
}

export default ResourcesRow;