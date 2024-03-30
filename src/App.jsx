import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import { useState } from "react";

import Form from "./components/Form";
import AvailableSeats from "./components/AvailableSeats";
import Loader from "./components/Loader";
import { createContext } from "react";

export const FormContext = createContext();

function App() {
  const [openSeat, setOpenSeat] = useState(false);
  const [seatSelected, setSeatSelected] = useState("");
  const [busNumber, setBusNumber] = useState(0);
  return (
    <FormContext.Provider
      value={{
        openSeat,
        seatSelected,
        busNumber,
        setOpenSeat,
        setSeatSelected,
        setBusNumber,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="form" element={<Form />}>
            <Route path="seats" element={<AvailableSeats />} />
          </Route>
          <Route path="form/complete" element={<Loader />} />

          <Route path="*" element={<p>page not found</p>} />
        </Routes>
      </BrowserRouter>
    </FormContext.Provider>
  );
}

export default App;
