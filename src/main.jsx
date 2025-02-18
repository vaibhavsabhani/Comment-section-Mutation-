import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { PostApi } from './Feature/PostApi.jsx'

createRoot(document.getElementById('root')).render(
   <ApiProvider api={PostApi}>
    <App/>
   </ApiProvider>
)
