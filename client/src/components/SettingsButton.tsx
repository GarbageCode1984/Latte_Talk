import { useNavigate } from "react-router-dom";
import "../styles/SettingsButton.scss";

const SettingsButton = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/setting");
    };

    return (
        <button className="SetButton" onClick={handleClick}>
            <img src="/settings.png" alt="아이콘 제작자: Freepik - Flaticon" />
        </button>
    );
};

export default SettingsButton;
