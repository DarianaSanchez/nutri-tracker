import '../style.css';
import React, { useState } from "react";

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
            <span>{dietItem.description}</span>
            <input
                id={"serving_" + dietItem.fdcId}
                name={"serving_" + dietItem.fdcId}
                type="number"
                value={intakeServing}
                onChange={handleChangeServing}
                min="0.1"
                max="999"
                required
                placeholder="grams"
                className="inline-input"
            />grs
            <button className="remove-button" onClick={() => removeFoodFromDiet()}>x</button>
        </div>
    )
}

export default React.memo(DietItem);