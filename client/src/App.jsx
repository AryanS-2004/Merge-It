import './App.css'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import IssuesPage from "./pages/IssuesPage.jsx";

function App() {

    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/issues" element={<IssuesPage/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App
