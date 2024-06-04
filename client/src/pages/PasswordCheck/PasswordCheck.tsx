import { SubmitHandler, useForm } from "react-hook-form";
import "../../styles/PasswordCheck.scss";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { checkPasswordRoom } from "../../store/thunkFunctions";
import { useNavigate, useParams } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton";

type Inputs = {
    password: string;
    roomId: string;
};

const PasswordCheck = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" });
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { roomId } = useParams();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const body = {
            password: data.password,
            roomId: roomId || "",
        };
        const response = await dispatch(checkPasswordRoom(body)).unwrap();
        if (response.success) {
            navigate(`/rooms/${roomId}`);
        }
    };
    const passwordCheck: { required: string } = {
        required: "필수 필드입니다.",
    };
    return (
        <div className="layout">
            <div className="smartPhone">
                <NavigateButton />

                <form className="PasswordCheckForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="checkInput">
                        <TextField
                            id="password"
                            label="password"
                            variant="outlined"
                            type="password"
                            {...register("password", passwordCheck)}
                        />
                        {errors?.password && (
                            <div>
                                <span className="errTeg">{errors.password.message}</span>
                            </div>
                        )}
                    </div>

                    <button className="checkButton" type="submit">
                        확인
                    </button>
                </form>
            </div>
        </div>
    );
};
export default PasswordCheck;
