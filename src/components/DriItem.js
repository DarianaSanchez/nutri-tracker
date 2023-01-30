// import styles from "../style.module.css";
import { useState, useEffect, useCallback } from "react";
import nutrientMapping from "../data/api_nutrient_mapping.json";
// TODO: add api_code to dri_db.json

const DriItem = ({ driItem, dietTrack }) => {
    const [nutrientIntake, setNutrientIntake] = useState(0);
    const [driNutrientPercentage, setDriNutrientPercentage] = useState(0);

    const trackDri = useCallback(() => {
        let nutrientIntakeAcc = 0;
        const nutrientId = nutrientMapping.find(m => m.nutrient === driItem.nutrient);
        
        for (const dtItem of dietTrack) {
            const foodNutrients = dtItem.foodNutrients.filter(n => n.nutrientId === nutrientId.api_code);
            nutrientIntakeAcc = foodNutrients.reduce((total, item) => {
                const nutrientTotal = (item.valueByUnit || 0) * dtItem.intakeServing;
                return total + nutrientTotal;
            }, nutrientIntakeAcc);
        }
        const percentage = Math.round((nutrientIntakeAcc / driItem.dri) * 100);

        setNutrientIntake(nutrientIntakeAcc);
        setDriNutrientPercentage(percentage);
    }, [driItem, dietTrack]);

    useEffect(() => {
        trackDri();
    }, [trackDri]);

    return (
        <div>
            <li key={driItem.id}>{driItem.nutrient} <strong>{driItem.dri}mg - {nutrientIntake}g - {driNutrientPercentage}%</strong></li>
        </div>
    )
}

export default DriItem;