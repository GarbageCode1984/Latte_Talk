import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainHome from "./pages/MainHome/MainHome";
import ChatPw from "./pages/ChatPw/ChatPw";
import ChatRegister from "./pages/ChatRegister/ChatRegister";
import LandingPage from "./pages/LandingPage/LandingPage";

const App: React.FC = () => {
    return (
        <div>
            <Routes>
                <Route index element={<LandingPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>

                <Route path="/mainHome" element={<MainHome />}></Route>
                <Route path="/chat" element={<Chat />}></Route>
                <Route path="/chatPw" element={<ChatPw />}></Route>
                <Route path="/chatRegister" element={<ChatRegister />}></Route>
            </Routes>
        </div>
    );
};

export default App;
