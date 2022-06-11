import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResourcesList from "../resources-list/ResourcesList";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { useSelector } from 'react-redux';

function App() {

    const statusMessage = useSelector((state) => state.statusMessage);

    return (
        <div className="App">
            <header>The navbar</header>
            {/* TODO  the navigation component */}
            {
                statusMessage
                    ? (<p className="status--paragraph"> {statusMessage} </p>)
                    : ''
            }
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="resources/:userName" element={<ResourcesList/>}/>
                    <Route path="/register-form" element={<RegisterForm/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
