import { useEffect, useState } from "react";
import styles from "./Loader.module.css";
import { useNavigate } from "react-router-dom";

const TIME_OUT = 5000;
function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => {
      setIsLoading(false);
    }, TIME_OUT);

    return () => clearTimeout(id);
  }, []);
  return (
    <div>
      {isLoading ? (
        <>
          <p className={styles.text}>
            communicating with our servers this might take a minute.
          </p>
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </>
      ) : (
        <>
          <p className={styles.text}>
            Transaction successful. Thanks for using our service😊
          </p>
          <button className={styles.btn} onClick={() => navigate(-2)}>
            close
          </button>
        </>
      )}
    </div>
  );
}

export default Loader;
