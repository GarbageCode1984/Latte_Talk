import { useNavigate } from "react-router-dom";
import "../styles/NavigateButton.scss";

const NavigateButton = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/main");
    };

    return (
        <button className="NavButton" onClick={handleClick}>
            <img src="/mainPage.png" alt="아이콘 제작자: mattbadal - Flaticon" />
        </button>
    );
};

export default NavigateButton;
