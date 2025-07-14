import { createRoot } from 'react-dom/client'
import './style/index.css'
import { BrowserRouter } from "react-router";
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import Router from './routing/Router.jsx';
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>
)
