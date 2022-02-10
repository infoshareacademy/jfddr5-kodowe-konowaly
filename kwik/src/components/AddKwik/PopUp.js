import React from "react";
import s from "./PopUp.module.css";

const PopUp = (props) => {
  return (
    <div className={s.box}>
      <button className={s.closeButton} onClick={props.handleClose}>
        x
      </button>
      {props.content}
    </div>
  );
};

export default PopUp;
