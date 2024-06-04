import { useNavigate } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton";
import "../../styles/SettingPage.scss";

const SettingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="layout">
            <div className="smartPhone">
                <NavigateButton />
                <div className="settingLayout">
                    <button className="setButton" onClick={() => navigate("/delAccount")}>
                        계정 삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
