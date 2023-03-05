import React, { useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle, faExclamationCircle, faExclamationTriangle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import '../styles/Toast.scss';

export const toastType = Object.freeze({
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  CONFIRM: 'confirm',
});

export const Toast = ({ lists, setToastList }) => {
  const toastIcon = (type) => {
    if (type === toastType.CONFIRM) return faCheckCircle;
    else if (type === toastType.INFO) return faInfoCircle;
    else if (type === toastType.WARN) return faExclamationTriangle;
    else if (type === toastType.ERROR) return faExclamationCircle;
    else return faCheckCircle;
  };

  const handleToastClose = index => {
    deleteToast(index);
  };

  const deleteToast = useCallback((id) => {
    const toastList = lists;
    const toastIndex = toastList.findIndex((e) => e.id === id);
    toastList.splice(toastIndex, 1);
    setToastList([...toastList]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const timeUntilDelete = 8000;

  useEffect(() => {
    const interval = setInterval(() => {
      if(lists && lists.length > 0){
        deleteToast(lists[0].id);
      }
    }, timeUntilDelete);
    return () => { clearInterval(interval)};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lists]);

  return lists.map((listItem, index) => {
    return (
      <div
        key={`${index}-${listItem.type}`}
        className={`toast toast__${listItem.type}`}
      >
        <FontAwesomeIcon
          icon={toastIcon(listItem.type)}
          className="toast__icon"
        />
        <div>{listItem.message}</div>
        <FontAwesomeIcon
          icon={faTimes}
          className="toast__close-button"
          onClick={() => handleToastClose(listItem.id)}
        />
      </div>
    );
  });
};
