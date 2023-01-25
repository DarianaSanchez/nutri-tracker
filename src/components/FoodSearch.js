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
        const food = await getFood(foodId);
        setDietTrack([...dietTrack, food]);
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
                {searchResult.map(x => <li key={x.fdcId}>{x.description} - {x.servingSize} {x.servingSizeUnit} <button onClick={() => addFoodToDiet(x.fdcId)}>+</button></li>)}
            </ul>
        </div>
    )
}

export default FoodSearch;