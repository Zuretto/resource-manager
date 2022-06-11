import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResourcesList from "../resources-list/ResourcesList";
import LoginForm from "../login/LoginForm";


function App() {

    return (
        <div className="App">
            <header>The navbar</header>
            {/* TODO  the navigation component */}

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginForm/>}/>
                    <Route path="resources/:userName" element={<ResourcesList/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
