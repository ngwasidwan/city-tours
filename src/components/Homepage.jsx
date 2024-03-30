import styles from "./Homepage.module.css";
import CityInfo from "./CityInfo";

function Homepage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.intro}>
          <h1>Welcome to city tours Bamenda</h1>

          <p className={styles.text}>
            Travel at your convenience from the town of Bamenda. Pay your bus
            tickets from home to any city of your choice all over Cameroon with
            just a click
          </p>
          <CityInfo />
        </div>
      </div>
    </>
  );
}

export default Homepage;
