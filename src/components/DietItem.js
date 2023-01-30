// import styles from "../style.module.css";
import { useState } from "react";

const DietItem = ({ dietItem, dietTrack, setDietTrack }) => {
    const [intakeServing, setIntakeServing] = useState(dietItem.servingSize);

    const updateDietTrack = (serving) => {
        const newDietTrack = dietTrack.map(x => {
            if (x.fdcId === dietItem.fdcId) {
                x["intakeServing"] = parseInt(serving || 0);
            }
            return x;
        });
        setDietTrack(newDietTrack);
    }

    const removeFoodFromDiet = () => {
        setDietTrack(dietTrack.filter(x => x.fdcId !== dietItem.fdcId));
    }

    const handleChangeServing = (event) => {
        setIntakeServing(event.target.value);
        updateDietTrack(event.target.value);
    }

    return (
        <div>
            <p>{dietItem.description}</p>
            <input
                id={"serving_" + dietItem.fdcId}
                name={"serving_" + dietItem.fdcId}
                type="number"
                value={intakeServing}
                onChange={handleChangeServing}
                min="0.1"
                required
                placeholder="grams"
            />grs
            <button onClick={() => removeFoodFromDiet()}>x</button>
        </div>
    )
}

export default DietItem;