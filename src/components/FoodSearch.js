import '../style.css';
import { useState } from "react";
import { searchFoods, convertWeight } from "../utils/utils.js";

const FoodSearch = ({ dietTrack, setDietTrack }) => {
    const [foodName, setFoodName] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const PORTION = convertWeight(100, 'g');

    const handleChangeFoodName = (event) => {
        setFoodName(event.target.value);
    }

    const handleSearchForm = async (event) => {
        event.preventDefault();

        const foods = await searchFoods(foodName);
        setSearchResult(foods);
    }

    const addFoodToDiet = async (foodId) => {
        const food = searchResult.find(x => x.fdcId === foodId);

        if (food) {
            const trackingReadyFood = prepareNutrientTracking(food);
            setDietTrack([...dietTrack, trackingReadyFood]);
        }
    }

    const isAddedToDiet = (foodId) => {
        return dietTrack.filter(x => x.fdcId === foodId).length;
    }

    // INFO: prepare food object for nutrient tracking
    const prepareNutrientTracking = (food) => {
        food["intakeServing"] = food.servingSize;

        for(let nutrient of food.foodNutrients) {
            const unit = PORTION[nutrient.unitName.toLowerCase()];
            nutrient["valueByUnit"] = unit ? (nutrient.value / unit) : 0;
        }

        return food;
    }

    return (
        <div>
            <form onSubmit={handleSearchForm}>
                <input
                    id="food"
                    name="food"
                    value={foodName}
                    onChange={handleChangeFoodName}
                    maxLength="50"
                    placeholder="food name..."
                    required
                />
                <button>Search</button>
            </form>
            <ul>
                {searchResult.map(x => <li key={x.fdcId}>{x.description} - {x.servingSize} {x.servingSizeUnit} <button className={isAddedToDiet(x.fdcId) ? "hidden" : "visible"} onClick={() => addFoodToDiet(x.fdcId)}>+</button></li>)}
            </ul>
        </div>
    )
}

export default FoodSearch;