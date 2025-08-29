import { createRoot } from 'react-dom/client'
import './style/index.css'
import { BrowserRouter } from "react-router";
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import Router from './routing/Router.jsx';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop.jsx';
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <ScrollToTop />
            <Toaster toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                },
            }} />
            <Router />
        </BrowserRouter>
    </Provider>
)
