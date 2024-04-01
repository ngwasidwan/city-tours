import { useContext, useEffect, useState } from "react";
import styles from "./AvailableSeats.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FormContext } from "../App";

const TOTAL_SEATS = 70;

function AvailableSeats() {
  const [disableBtn, setDisableBtn] = useState(true);
  const [seatNumbers, setSeatNumbers] = useState([]);

  const navigate = useNavigate();
  const { setSeatSelected, seatSelected, setBusNumber, setClickBtn } =
    useContext(FormContext);

  const [searchParam] = useSearchParams();
  const curAgency = searchParam.get("agency");

  function handleSeatSelected(e) {
    setSeatSelected(e.target.value);
    setDisableBtn(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/${curAgency}`);
        const [dataArr, ...userInfo] = await res.json();

        const seatsTaken = userInfo.map((el) => +el.seatNumber);

        const filteredSeats = seatsTaken.reduce(
          (acc, curSeat) => (acc.includes(curSeat) ? acc : [...acc, curSeat]),
          []
        );

        const updateSeats = dataArr.map((seat) =>
          filteredSeats.includes(seat) ? "X" : seat
        );

        if (seatsTaken.length % TOTAL_SEATS) {
          setSeatNumbers(updateSeats);
        } else {
          setSeatNumbers(dataArr);
          setBusNumber((curNum) => curNum + 1);
        }
      } catch {
        console.log("there was an error");
      }
    };
    setClickBtn(false);
    fetchData();
  }, [curAgency, setBusNumber, setClickBtn]);
  return (
    <div>
      <span className={styles.seat}>Selected seat: {seatSelected}</span>
      <button
        disabled={disableBtn}
        onClick={() => {
          navigate(-1);
          setClickBtn(true);
        }}
        className={styles.disableBtn}
      >
        confirm
      </button>

      <div className={styles.gridContainer}>
        {seatNumbers.map((seat, i) => (
          <input
            key={i}
            value={seat}
            readOnly
            className={`${styles.seatNumber} ${
              seat === "X" && styles.selected
            }`}
            onClick={handleSeatSelected}
          />
        ))}
      </div>
    </div>
  );
}

export default AvailableSeats;
