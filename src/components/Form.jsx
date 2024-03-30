import { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Form.module.css";

import { FormContext } from "../App";
import { data } from "../data/data";

// const TOTAL_SEATS = 70;

function Form() {
  const [searchParam] = useSearchParams();

  const curAgency = searchParam.get("agency");
  const curDestination = searchParam.get("cur_destination");
  const price = data.amount[curDestination];

  const [nameVal, setNameVal] = useState("");
  const [number, setNumber] = useState("");
  const [schedule, setSchedule] = useState("");
  const [paymentService, setPaymentService] = useState("");

  const { seatSelected, busNumber, setSeatSelected } = useContext(FormContext);

  const activeEl = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    activeEl.current.focus();
    setSeatSelected("");
  }, [setSeatSelected]);

  function handleNameInput(e) {
    setNameVal(e.target.value);
  }
  function handleNumberInput(e) {
    setNumber(e.target.value);
  }
  function handleSchedule(e) {
    setSchedule(e.target.value);
  }
  function handlePaymentService(e) {
    setPaymentService(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("complete");

    const formData = new FormData(e.target);

    const userName = formData.get("user");

    const userNumber = formData.get("number");
    const travelingSession = formData.get("session");
    const seatNumber = formData.get("seat-number");

    const userObj = {
      userName,
      userNumber,
      travelingSession,
      seatNumber,
      busNumber,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    };

    const postData = async () => {
      try {
        await fetch(`http://localhost:8000/${curAgency}`, options);
      } catch (err) {
        console.log(err.message);
      }
    };

    postData();
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Welcome to {curAgency} express bamenda</h3>
        <p className={styles["intro-text"]}>
          We offer the best VIP service for your personal comfort
        </p>

        <label> enter your name</label>
        <input
          ref={activeEl}
          type="text"
          name="user"
          required
          placeholder="sabi pikin"
          className={styles.name}
          value={nameVal}
          onChange={handleNameInput}
        />

        <p className={styles.session}>choose your traveling session</p>

        <span className={styles["session-text"]}>
          Traveling sessions are scheduled for mornings and evenings
        </span>

        <div>
          <select
            name="session"
            className={styles.time}
            value={schedule}
            onChange={handleSchedule}
          >
            <option value="">none</option>
            <option value="morning"> morning | 8am</option>
            <option value="evening"> evening | 6pm</option>
          </select>
        </div>

        <div>
          <Link to={`seats?agency=${curAgency}`} className={styles.seatBtn}>
            {seatSelected ? "change " : "choose "}seat
          </Link>
          <input
            className={styles.seat}
            value={seatSelected}
            name="seat-number"
            readOnly
          />
        </div>

        <div>
          <span className={styles.method}>select payment service</span>
          <select className={styles.payment} onChange={handlePaymentService}>
            <option value="">none</option>
            <option value="mtn ">MTN mobile money</option>
            <option value="orange ">orange money</option>
            <option value=" credit_card">credit card</option>
          </select>

          {paymentService && (
            <div>
              <span className={styles.service}>
                Enter {paymentService} mobile money number
              </span>
              <input
                type="number"
                name="number"
                required
                placeholder="675 970 381"
                value={number}
                onChange={handleNumberInput}
                className={styles.number}
              />
            </div>
          )}
        </div>

        <div>
          <span className={styles.amount}>
            AMOUNT: <strong>{price} FCFA </strong>
          </span>
        </div>

        <span onClick={() => navigate(-1)} className={styles["btn-back"]}>
          &larr; back
        </span>

        {paymentService && seatSelected && schedule && (
          <button className={styles.confirm}>confirm</button>
        )}

        <span className={styles.checkInfo}>
          please double check to see that all info is correct
        </span>
      </form>

      <Outlet />
    </div>
  );
}

export default Form;
