import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios';
// axios.defaults.baseURL = 'https://blog-app-backend-indol.vercel.app/api';
// axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.baseURL = 'https://kanban-board-a23r.vercel.app/api';

// axios.defaults.baseURL = 'https://backend-git-main-saifuls-projects-2ab36682.vercel.app/api';
// axios.defaults.baseURL = 'https://backend-nu-blue-30.vercel.app/api';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
