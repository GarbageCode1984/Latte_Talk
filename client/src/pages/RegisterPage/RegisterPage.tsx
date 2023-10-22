import { Link } from "react-router-dom";
import "../../styles/RegisterPage.scss";
import TextField from "@mui/material/TextField";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "./../../store/thunkFunctions";
import { ThunkDispatch } from "@reduxjs/toolkit";

type Inputs = {
    email: string;
    password: string;
    name: string;
};

const RegisterPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" });

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const onSubmit: SubmitHandler<Inputs> = ({ email, password, name }) => {
        const body = {
            email,
            password,
            name,
        };
        dispatch(registerUser(body));
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
                                    label="email"
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
                                    label="name"
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
                                    label="password"
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
                                <Button variant="dark" size="lg" type="submit">
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
