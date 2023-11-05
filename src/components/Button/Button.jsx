import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./Button.module.css";
import { useUpdateCommentMutation } from "../../redux/commentApi";

export const Button = ({ children, counter, role = "thumbsUp", id }) => {
  const [voted, setVoted] = useState(false);
  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const variants = {
    [styles.thumbsUp]: role === "thumbsUp",
    [styles.thumbsDown]: role === "thumbsDown",
  };

  const onBtnHandleClick = async () => {
    console.log("click");
    try {
      await updateComment({
        id,
        [role]: !voted ? counter + 1 : counter - 1,
      }).unwrap();
      setVoted((p) => !p);
    } catch (error) {}
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
