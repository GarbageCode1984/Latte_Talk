import { Link } from "react-router-dom";
import "../../styles/LandingPage.scss";

const LandingPage = () => {
    return (
        <div className="layout">
            <div className="smartPhone">
                <div className="coffee"></div>
                <h1 className="hello">안녕하세요.</h1>
                <p className="text">
                    웹채팅 프로젝트
                    <br /> 라떼톡입니다.
                </p>
                <Link className="start" to="/main">
                    시작하기
                </Link>
            </div>
        </div>
    );
};

export default LandingPage;
