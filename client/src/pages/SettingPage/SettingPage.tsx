import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton";
import "../../styles/SettingPage.scss";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { logOut } from "../../store/thunkFunctions";

const SettingPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const handleLogout = async () => {
        await dispatch(logOut());
        navigate("/login");
    };

    return (
        <div className="layout">
            <div className="smartPhone">
                <NavigateButton />
                <div className="settingLayout">
                    <button className="setButton" onClick={handleLogout}>
                        로그아웃
                    </button>
                    <button className="setButton" onClick={() => navigate("/delAccount")}>
                        계정 삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
