import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainHome from "./pages/MainHome/MainHome";
import ChatPw from "./pages/ChatPw/ChatPw";
import ChatRegister from "./pages/ChatRegister/ChatRegister";
import LandingPage from "./pages/LandingPage/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "./store/userSlice";
import { useEffect } from "react";
import { authUser } from "./store/thunkFunctions";

export interface RootState {
    user: UserState;
}

function Layout() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
            <ToastContainer position="bottom-right" theme="light" pauseOnHover autoClose={1500} />
        </div>
    );
}

const App: React.FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: RootState) => state.user?.isAuth);
    const { pathname } = useLocation();

    useEffect(() => {
        if (isAuth) {
            dispatch(authUser());
        }
    }, [isAuth, pathname, dispatch]);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>

                    <Route path="/mainHome" element={<MainHome />}></Route>
                    <Route path="/chat" element={<Chat />}></Route>
                    <Route path="/chatPw" element={<ChatPw />}></Route>
                    <Route path="/chatRegister" element={<ChatRegister />}></Route>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
