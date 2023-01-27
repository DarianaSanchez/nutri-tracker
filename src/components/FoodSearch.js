import styles from "../style.module.css";
import { useState } from "react";
import { searchFoods, getFood } from "../utils/utils.js";

const FoodSearch = ({ dietTrack, setDietTrack }) => {
    const [foodName, setFoodName] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleChangeFoodName = (event) => {
        setFoodName(event.target.value);
    }
    const handleSearchForm = async (event) => {
        event.preventDefault();

        const foods = await searchFoods(foodName);
        setSearchResult(foods);
    }
    const addFoodToDiet = async (foodId) => {
        // TODO: do not use getFood method, use searchResult instead (to avoid an additional request)
        const food = await getFood(foodId);
        setDietTrack([...dietTrack, food]);
    }
    const isAddedToDiet = (foodId) => {
        return dietTrack.filter(x => x.fdcId === foodId).length;
    }

    return (
        <div className={styles.section}>
            <form onSubmit={handleSearchForm}>
                <input
                    id="food"
                    name="food"
                    value={foodName}
                    onChange={handleChangeFoodName}
                    maxLength="50"
                    placeholder="Alimento..."
                    required
                />
                <button>Buscar</button>
            </form>
            <ul>
                {searchResult.map(x => <li key={x.fdcId}>{x.description} - {x.servingSize} {x.servingSizeUnit} <button className={isAddedToDiet(x.fdcId) ? styles.hidden : styles.visible} onClick={() => addFoodToDiet(x.fdcId)}>+</button></li>)}
            </ul>
        </div>
    )
}

export default FoodSearch;