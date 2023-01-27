// import styles from "../style.module.css";
import { useState, useEffect, useCallback } from "react";
import nutrientMapping from "../data/api_nutrient_mapping.json";
// TODO: add api_code to dri_db.json

const DriItem = ({ driItem, dietTrack }) => {
    const [nutrientIntake, setNutrientIntake] = useState(0);
    const [driNutrientPercentage, setDriNutrientPercentage] = useState(0);

    const calculateDriPercentage = useCallback(() => {
        // TODO: use DietItem servigSize state
        const foodNutrients = dietTrack.map(x => x.foodNutrients);
        const nutrientId = nutrientMapping.filter(m => m.nutrient === driItem.nutrient)[0];
        const nutrientIntakeAcc = foodNutrients.reduce((total, dietItem) => {
            const itemNutrient = dietItem.filter(n => (
                n.type === "FoodNutrient" && n.nutrient.id === nutrientId.api_code
            ));
            const nutrientRank = itemNutrient.length ? itemNutrient[0].nutrient.rank : 0; 
            return total + nutrientRank;
        }, 0);
        const percentage = Math.round((nutrientIntakeAcc / driItem.dri) * 100);

        setNutrientIntake(nutrientIntakeAcc);
        setDriNutrientPercentage(percentage);
    }, [driItem, dietTrack]);

    useEffect(() => {
        calculateDriPercentage();
    }, [calculateDriPercentage]);

    return (
        <div>
            <li key={driItem.id}>{driItem.nutrient} <strong>{driItem.dri}mg - {nutrientIntake}g - {driNutrientPercentage}%</strong></li>
        </div>
    )
}

export default DriItem;