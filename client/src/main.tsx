import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const rootNode = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootNode).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
