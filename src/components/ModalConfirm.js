import React from "react";

import {
  faTrashAlt, faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "../components/FormFieldButton.js";

import "../styles/Modal.scss";

export const ModalConfirm = ({message, actionFunc, show, closeFunc}) => {

  return (
    show && (
      <div className="modal" onClick={closeFunc}>
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          <div className="modal__message">{message}</div>
          <div className="modal__button-container">
            <IconButton
              icon={faTimesCircle}
              label="cancel"
              onClickHandler={closeFunc}
              className="icon-button"
            />
            <IconButton
              icon={faTrashAlt}
              label="delete"
              onClickHandler={actionFunc}
              className="icon-button--delete"
            />
          </div>
        </div>
      </div>
    )
  );
}