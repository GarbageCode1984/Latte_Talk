import { TextField } from "@mui/material";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/LoginPage.scss";
import { loginUser } from "../../store/thunkFunctions";

type Inputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" });

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
        const body = {
            email,
            password,
        };
        dispatch(loginUser(body));
    };

    const userEmail: { required: string } = {
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
                        <h1 className="registerH1">로그인</h1>

                        <form className="registerForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="inputForm">
                                <TextField
                                    id="email"
                                    label="email"
                                    variant="outlined"
                                    type="email"
                                    autoComplete="email"
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
                                    id="password"
                                    label="password"
                                    variant="outlined"
                                    type="password"
                                    autoComplete="current-password"
                                    {...register("password", userPassword)}
                                />
                                {errors?.password && (
                                    <div>
                                        <span className="errTeg">{errors.password.message}</span>
                                    </div>
                                )}
                            </div>

                            <div className="Log">
                                <p>아이디가 없다면?</p>&nbsp;
                                <Link to="/register">회원가입</Link>
                            </div>

                            <div className="LoginButton">
                                <Button variant="dark" size="lg" type="submit">
                                    로그인
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LoginPage;
