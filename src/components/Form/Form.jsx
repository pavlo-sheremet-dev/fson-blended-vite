import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiMailSend } from "react-icons/bi";
import { usePostCommentMutation } from "../../redux/commentApi";
import styles from "./Form.module.css";
import { Loader } from "../Loader/Loader";

export const Form = () => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [addNewComment, { isLoading }] = usePostCommentMutation();

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setAuthor(value);
    } else {
      setContent(value);
    }
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addNewComment({ author, content }).unwrap();
      setAuthor("");
      setContent("");
      toast.success("Success");
    } catch (e) {
      toast.error("Error");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name="text"
            rows="5"
            value={content}
            onChange={onHandleChange}
          ></textarea>
        </label>

        <button className={styles.formBtn}>
          <BiMailSend className={styles.icon} />
          Send
        </button>
      </form>
      {isLoading && <Loader />}
    </div>
  );
};
