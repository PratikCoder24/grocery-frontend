import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Toast from './toast/Toast';
import {Store} from './store/store';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <App />
    <Toast />
    </Provider>
  </StrictMode>,
)
