import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
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
import Main from "./pages/Main/Main";
import RoomCreate from "./pages/RoomCreate/RoomCreate";
import PasswordCheck from "./pages/PasswordCheck/PasswordCheck";
import SettingPage from "./pages/SettingPage/SettingPage";
import DeleteAccount from "./pages/DeleteAccount/DeleteAccount";

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

const App = () => {
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
                        <Route path="/main" element={<Main />} />
                        <Route path="/rooms/:roomId" element={<Chat />} />
                        <Route path="/passwordCheck/:roomId" element={<PasswordCheck />} />
                        <Route path="/create" element={<RoomCreate />} />
                        <Route path="/setting" element={<SettingPage />} />
                        <Route path="/delAccount" element={<DeleteAccount />} />
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
