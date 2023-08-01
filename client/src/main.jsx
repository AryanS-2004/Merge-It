import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";
import IssuesProvider from "./Context/IssuesProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider>
                <IssuesProvider>
                <App/>
                </IssuesProvider>
            </ChakraProvider>
        </BrowserRouter>
    // </React.StrictMode>,
)
