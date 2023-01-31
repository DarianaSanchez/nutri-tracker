// import styles from "../style.module.css";
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
        <div>
            <li key={driItem.id}>{driItem.description} <strong>{driItem.dri}{driItem.unit} - {nutrientIntake}{driItem.unit} - {driNutrientPercentage}%</strong></li>
        </div>
    )
}

export default React.memo(DriItem);