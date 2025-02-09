import { useLocation, useNavigate } from "react-router-dom";
import s from "./GoBackBtn.module.css"

const GoBackBtn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const backLink = location.state?.from ?? "/"; 

    return (
        <button onClick={() => navigate(backLink)} className={s.backBtn}>Go Back</button>
    );
}

export default GoBackBtn;