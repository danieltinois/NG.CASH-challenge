import React from "react";
import styles from "./styles.module.scss";
import Loader from "./loader.svg";

const Loading = () => {
  return (
    <div className={styles.container}>
      <img src={Loader} alt="Loading" className={styles.imgLoading} />
    </div>
  );
};

export default Loading;
