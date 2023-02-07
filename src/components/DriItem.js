import '../style.css';
import React, { useState, useEffect, useCallback } from "react";
import { convertWeight, round } from "../utils/utils.js";

const DriItem = ({ driItem, dietTrack }) => {
    const [nutrientIntake, setNutrientIntake] = useState(0);
    const [driNutrientPercentage, setDriNutrientPercentage] = useState(0);

    const trackDri = useCallback(() => {
        let nutrientIntakeAcc = 0;
        
        for (const dtItem of dietTrack) {
            const foodNutrients = dtItem.foodNutrients.filter(n => n.nutrientId === driItem.api_code);
            nutrientIntakeAcc = foodNutrients.reduce((total, item) => {
                const nutrientTotal = (item.valueByUnit || 0) * dtItem.intakeServing;
                const totalConverted = convertWeight(nutrientTotal, item.unitName.toLowerCase());
                return total + (totalConverted && totalConverted[driItem.unit]);
            }, nutrientIntakeAcc);
        }

        const percentage = (nutrientIntakeAcc / driItem.dri) * 100;

        setNutrientIntake(round(nutrientIntakeAcc, 4));
        setDriNutrientPercentage(round(percentage));
    }, [driItem, dietTrack]);

    useEffect(() => {
        trackDri();
    }, [trackDri]);

    return (
        <tr key={driItem.id}>
            <td>{driItem.description}</td>
            <td><strong>{driItem.dri}{driItem.unit}</strong></td>
            <td><strong>{nutrientIntake}{driItem.unit}</strong></td>
            <td><strong><div className="nutrient-percentage"><progress min="0" max="100" value={driNutrientPercentage}></progress><span>{driNutrientPercentage}%</span></div></strong></td>
        </tr>
    )
}

export default React.memo(DriItem);