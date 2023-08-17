import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import IssuesProvider from './Context/IssuesProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/' >
      <ChakraProvider>
        <IssuesProvider>
          <App />
        </IssuesProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
