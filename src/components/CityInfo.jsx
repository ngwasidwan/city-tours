import { Link } from "react-router-dom";
import styles from "./CityInfo.module.css";
import { useState } from "react";

const destinationArr = ["douala", "buea", "yaounde", "baffoussam"];

function CityInfo() {
  // const [city, setCity] = useState("");
  const [agency, setAgency] = useState("");
  const [curDestination, setCurDestination] = useState("");

  return (
    <div className={styles.form}>
      <form>
        <p className={styles.agency}>Please choose your agency</p>
        <select
          className={styles.city}
          value={agency}
          onChange={(e) => setAgency(e.target.value)}
        >
          <option value="">none</option>
          <option value="moghamo">Moghamo express</option>
          <option value="vatican">Vatican express</option>
          <option value="guarantee">Guarantee express</option>
          <option value="peoples">Peoples express</option>
        </select>

        <p className={styles["destination-intro"]}>
          please choose your destination
        </p>

        <select
          className={styles.destination}
          value={curDestination}
          onChange={(e) => setCurDestination(e.target.value)}
        >
          <option value="">none</option>
          {destinationArr.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </select>
      </form>
      {agency && curDestination && (
        <Link to={`form?agency=${agency}&cur_destination=${curDestination}`}>
          next
        </Link>
      )}
    </div>
  );
}

export default CityInfo;
