import { Link } from "react-router-dom";
import "../../styles/RegisterPage.scss";
import TextField from "@mui/material/TextField";

const RegisterPage = () => {
    return (
        <div className="layout">
            <div className="smartPhone">
                <section>
                    <div>
                        <h1 className="RegisterH1">회원가입</h1>

                        <form className="RegisterForm">
                            <div className="inputForm">
                                <TextField id="email" label="Email" variant="outlined" type="email" />
                            </div>
                            <div className="inputForm">
                                <TextField id="name" label="Name" variant="outlined" type="text" />
                            </div>
                            <div className="inputForm">
                                <TextField id="password" label="Password" variant="outlined" type="password" />
                            </div>

                            <div className="Reg">
                                <p>아이디가 있다면?</p>&nbsp;
                                <Link to="/login">로그인</Link>
                            </div>

                            <div className="registerButton">
                                <button>회원가입</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RegisterPage;
