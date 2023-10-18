import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";

const rootNode = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootNode).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
