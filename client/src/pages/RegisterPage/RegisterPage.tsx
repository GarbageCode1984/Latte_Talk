import { Link } from "react-router-dom";
import "../../styles/RegisterPage.scss";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
    name: string;
};

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({ mode: "onChange" });

    const onSubmit: SubmitHandler<Inputs> = ({ email, password, name }) => {
        console.log(email, password, name);
        reset();
    };

    const userEmail: { required: string } = {
        required: "필수 필드입니다.",
    };

    const userName: { required: string } = {
        required: "필수 필드입니다.",
    };

    const userPassword: { required: string; minLength: { value: number; message: string } } = {
        required: "필수 필드입니다.",
        minLength: {
            value: 8,
            message: "최소 8자입니다.",
        },
    };

    return (
        <div className="layout">
            <div className="smartPhone">
                <section>
                    <div>
                        <h1 className="registerH1">회원가입</h1>

                        <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="inputForm">
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    {...register("email", userEmail)}
                                />
                                {errors?.email && (
                                    <div>
                                        <span className="errTeg">{errors.email.message}</span>
                                    </div>
                                )}
                            </div>
                            <div className="inputForm">
                                <TextField
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    {...register("name", userName)}
                                />
                                {errors?.name && (
                                    <div>
                                        <span className="errTeg">{errors.name.message}</span>
                                    </div>
                                )}
                            </div>
                            <div className="inputForm">
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                    {...register("password", userPassword)}
                                />
                                {errors?.password && (
                                    <div>
                                        <span className="errTeg">{errors.password.message}</span>
                                    </div>
                                )}
                            </div>

                            <div className="Reg">
                                <p>아이디가 있다면?</p>&nbsp;
                                <Link to="/login">로그인</Link>
                            </div>

                            <div className="registerButton">
                                <Button variant="dark" size="lg">
                                    회원가입
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RegisterPage;
