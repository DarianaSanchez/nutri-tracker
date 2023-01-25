import { useState } from "react";
import styles from "./style.module.css";
import DRITracker from "./components/DRITracker"
import FoodSearch from "./components/FoodSearch";
import DietTracker from "./components/DietTracker";

function App() {
  const [DRITrack, setDRITrack] = useState([]);
  const [dietTrack, setDietTrack] = useState([]);

  return (
    <div className="App">
      <div className={styles.header}><h1>NUTRI-TRACKER</h1></div>
      <DRITracker DRITrack={DRITrack} setDRITrack={setDRITrack}/>
      <FoodSearch dietTrack={dietTrack} setDietTrack={setDietTrack}/>
      <DietTracker dietTrack={dietTrack} setDietTrack={setDietTrack}/>
    </div>
  );
}

export default App;
