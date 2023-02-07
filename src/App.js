import { useState } from "react";

import './style.css';
import DriTracker from "./components/DriTracker"
import FoodSearch from "./components/FoodSearch";
import DietTracker from "./components/DietTracker";

function App() {
  const [dietTrack, setDietTrack] = useState([]);

  return (
    <div className="container">
      <div className="layout header"><h1>NUTRI-TRACKER</h1></div>
      <div className="layout container-long">
        <p className="title">Food Search</p>
        <FoodSearch dietTrack={dietTrack} setDietTrack={setDietTrack}/>
      </div>
      <div className="layout container-wide">
        <p className="title">DRI Tracker</p>
        <DriTracker dietTrack={dietTrack}/>
      </div>
      <div className="layout container-wide">
        <p className="title">Diet Tracker</p>
        <DietTracker dietTrack={dietTrack} setDietTrack={setDietTrack}/>
      </div>
      <div className="layout footer"><span>Practice Project 2022<br/>Dariana Mabel Sánchez</span></div>
    </div>
  );
}

export default App;
