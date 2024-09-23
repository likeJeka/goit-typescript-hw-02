import React from "react";
import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Oval color="#ffffff" height={70} width={70} />
    </div>
  );
};

export default LoadingSpinner;
