import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ChatRegister from "./pages/ChatRegister/ChatRegister";
import LandingPage from "./pages/LandingPage/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "./store/userSlice";
import { useEffect } from "react";
import { authUser } from "./store/thunkFunctions";
import { ThunkDispatch } from "@reduxjs/toolkit";
import ProtedctedRoutes from "./components/ProtedctedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";

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
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
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
                    <Route index element={<LandingPage />} />

                    <Route element={<ProtedctedRoutes isAuth={isAuth} />}>
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/chatRegister" element={<ChatRegister />} />
                    </Route>

                    <Route element={<NotAuthRoutes isAuth={isAuth} />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
};

export default App;
