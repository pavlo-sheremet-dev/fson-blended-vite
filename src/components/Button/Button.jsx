import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./Button.module.css";
import { useAddFeedBackMutation } from "../../redux/commentApi";

export const Button = ({ children, counter, role = "thumbsUp", id }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [addNewFeedBack] = useAddFeedBackMutation();

  const variants = {
    [styles.thumbsUp]: role === "thumbsUp",
    [styles.thumbsDown]: role === "thumbsDown",
  };

  const onBtnHandleClick = async () => {
    console.log("click");
    console.log("thumbs: ", role);

    try {
      await addNewFeedBack({ id, [role]: counter + (isClicked ? -1 : 1) });
      setIsClicked((prevIsClicked) => !prevIsClicked);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  return (
    <button
      className={classNames(styles.button, variants)}
      type="button"
      counter={counter}
      onClick={onBtnHandleClick}
      id={id}
    >
      {children}

      <span className={styles.counter}>
        <span></span>
        {counter}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};
