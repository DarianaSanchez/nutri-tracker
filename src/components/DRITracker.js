import styles from "../style.module.css";
import { useState } from "react";
import { getDRI } from "../utils/utils.js";

const DRITracker = ({ DRITrack, setDRITrack }) => {
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    }
    const handleChangeAge = (event) => {
        setAge(event.target.value);
    }
    const handleForm = (event) => {
        event.preventDefault();

        const dri = getDRI(gender, age);
        setDRITrack(dri);
    }

    return (
        <div className={styles.section}>
            <form onSubmit={handleForm}>
                <select 
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={handleChangeGender}
                    required
                >
                    <option value="female">Mujer</option>
                    <option value="male">Hombre</option>
                    <option value="inclusive">...</option>
                </select>
                <input
                    id="age"
                    name="age"
                    type="number"
                    value={age}
                    onChange={handleChangeAge}
                    min="1"
                    max="500"
                    placeholder="Edad"
                    required
                />
                <button>Cargar</button>
            </form>
            <ul>
                {DRITrack.map(x => <li key={x.id}>{x.nutrient} <strong>{x.dri} mg</strong></li>)}
            </ul>
        </div>
    )
}

export default DRITracker;