import { useLocation, useNavigate } from "react-router-dom";
import s from "./GoBackBtn.module.css"
import { useRef } from "react";

const GoBackBtn = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const backLink = useRef(location.state?.from ?? "/");

    return (
      <button onClick={() => navigate(backLink.current)} className={s.backBtn}>Go Back</button>
    );
  };

  export default GoBackBtn;