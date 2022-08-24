import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';
import './assets/css/tailwind.css';
import ErrorBoundary from './components/HOC/ErrorBoundary';
import App from './routes';
import { store } from './state/store';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);
ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register();
