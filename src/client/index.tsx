import * as React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import App from './App';
// import { container } from './inversity.config';
import { InversityContextProvider } from './hooks/intensifyContextProvider';
import { store } from './store';

import './index.scss';
import { ConfirmDialogProvider } from './components/ConfirmDialog/ConfirmDialogProvider';

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <InversityContextProvider container={container}> */}
        <Provider store={store}>
            {/* <ConfirmDialogProvider> */}
            <ConfirmDialogProvider>
                <App />
            </ConfirmDialogProvider>
            {/* </ConfirmDialogProvider> */}
        </Provider>
        {/* </InversityContextProvider> */}
    </React.StrictMode>
);
