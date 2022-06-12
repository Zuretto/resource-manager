import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

    return (
        <div className="App">
            <header>The navbar</header>
            {/* TODO  the navigation component */}
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
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="/register-form" element={<RegisterForm/>}/>
                    <Route path="/reset-password" element={<ResetPasswordForm/>}/>

                    <Route path="/resources/:userName" element={<ResourcesList/>}/>
                    <Route path="/resources/:userName/create-resource" element={<CreateResourceForm/>}/>
                    <Route path="/resources/:userName/resource/:resourceName/edit" element={<EditResource/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
