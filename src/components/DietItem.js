// import styles from "../style.module.css";
import { useState } from "react";

const DietItem = ({ dietItem, dietTrack, setDietTrack }) => {
    const [servingSize, setServingSize] = useState(dietItem.servingSize);

    const handleChangeServing = (event) => {
        setServingSize(event.target.value);
    }
    const removeFoodFromDiet = (foodId) => {
        setDietTrack(dietTrack.filter(x => x.fdcId !== foodId));
    }

    return (
        <div>
            <p>{dietItem.description}</p>
            <input
                id={"serving_" + dietItem.fdcId}
                name={"serving_" + dietItem.fdcId}
                type="number"
                value={servingSize}
                onChange={handleChangeServing}
                min="0.1"
                required
                placeholder="grams"
            />grs
            <button onClick={() => removeFoodFromDiet(dietItem.fdcId)}>x</button>
        </div>
    )
}

export default DietItem;