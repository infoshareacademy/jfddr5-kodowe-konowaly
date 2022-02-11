import React from "react";
import s from "./PopUp.module.css";

const PopUp = (props) => {
  return (
        <div className={s.wrapper}>
            <div className={s.box}>
              <button className={s.closeButton} onClick={props.handleClose}>
              ✓
              </button>
              {props.content}
            </div>
        </div>
  );
};

export default PopUp;
