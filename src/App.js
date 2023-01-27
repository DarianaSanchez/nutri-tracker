import { useState } from "react";
import styles from "./style.module.css";
import DriTracker from "./components/DriTracker"
import FoodSearch from "./components/FoodSearch";
import DietTracker from "./components/DietTracker";

function App() {
  const [driTrack, setDriTrack] = useState([]); // TODO: probably staus belong to DriTracker component
  const [dietTrack, setDietTrack] = useState([]);

  return (
    <div className="App">
      <div className={styles.header}><h1>NUTRI-TRACKER</h1></div>
      <DriTracker dietTrack={dietTrack} driTrack={driTrack} setDriTrack={setDriTrack}/>
      <FoodSearch dietTrack={dietTrack} setDietTrack={setDietTrack}/>
      <DietTracker dietTrack={dietTrack} setDietTrack={setDietTrack}/>
    </div>
  );
}

export default App;
