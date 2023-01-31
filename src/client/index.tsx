import * as React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import App from './App';
// import { container } from './inversity.config';
import { InversityContextProvider } from './hooks/intensifyContextProvider';
import { store } from './store';

import './index.scss';

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <InversityContextProvider container={container}> */}
            <Provider store={store}>
                <App />
            </Provider>
        {/* </InversityContextProvider> */}
    </React.StrictMode>
);
