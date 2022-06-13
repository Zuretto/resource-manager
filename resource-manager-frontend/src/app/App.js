import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ResourcesList from "../resource/ResourcesList";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { useSelector } from 'react-redux';
import ResetPasswordForm from "../auth/ResetPasswordForm";
import CreateResourceForm from "../resource/CreateResourceForm";
import EditResource from "../resource/EditResource";

function App() {

    const statusMessage = useSelector((state) => state.statusMessage);
    const errorMessage = useSelector((state) => state.errorMessage);

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const loginOfLoggedInUser = useSelector((state) => state.userLogin);

    return (
        <BrowserRouter>
            <div className="navbar">
                {
                    isLoggedIn
                        ? <Link className="link" to={`/resources/${loginOfLoggedInUser}`}> Resource Manager </Link>
                        : <Link className="link" to='/'> Resource Manager </Link>

                }
            </div>
            <div className="App">

                {
                    statusMessage
                        ? (<p className="status--paragraph"> {statusMessage} </p>)
                        : ''
                }
                {
                    errorMessage
                        ? (<p className="error--paragraph"> {errorMessage} </p>)
                        : ''
                }
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="/register-form" element={<RegisterForm/>}/>
                    <Route path="/reset-password" element={<ResetPasswordForm/>}/>

                    <Route path="/resources/:userName" element={<ResourcesList/>}/>
                    <Route path="/resources/:userName/create-resource" element={<CreateResourceForm/>}/>
                    <Route path="/resources/:userName/resource/:resourceName" element={<EditResource/>}/>
                </Routes>
            </div>
        </BrowserRouter>

    );
}

export default App;
