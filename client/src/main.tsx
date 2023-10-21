import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.js";
const rootNode = document.getElementById("root") as HTMLElement;
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(rootNode).render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>
);
