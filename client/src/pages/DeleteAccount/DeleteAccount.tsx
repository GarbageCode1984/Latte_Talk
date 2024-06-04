import NavigateButton from "./../../components/NavigateButton";
import "../../styles/DeleteAccount.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { DeleteAccountUser } from "../../store/thunkFunctions";

interface UserId {
    user: {
        userData: {
            _id: string;
        };
    };
}

const DeleteAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const userId = useSelector((state: UserId) => state.user.userData._id);

    const backPage = () => {
        navigate(-1);
    };

    const handleButton = async () => {
        await dispatch(DeleteAccountUser({ userId }));
    };

    return (
        <div className="layout">
            <div className="smartPhone">
                <NavigateButton />
                <div className="DeleteAccountLayout">
                    <div className="trashOne">
                        <img className="trashIcon" src="/trash.png" />
                    </div>
                    <h1 className="DeleteAccountH1">정말로 계정을 삭제하시겠습니까?</h1>
                    <p className="DeleteAccountText">삭제 시, 계정을 복구하지 못합니다.</p>
                    <button className="del" onClick={handleButton}>
                        삭제
                    </button>
                    <button className="delUndo" onClick={backPage}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
