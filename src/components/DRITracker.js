import styles from "../style.module.css";
import { useState } from "react";
import { getDRI } from "../utils/utils.js";
import DriItem from "./DriItem";

const DriTracker = ({ dietTrack }) => {
    const [driTrack, setDriTrack] = useState([]); 
    const [gender, setGender] = useState("female");
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
        setDriTrack(dri);
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
                {driTrack.map(item => <DriItem key={item.id} driItem={item} driTrack={driTrack} dietTrack={dietTrack} />)}
            </ul>
        </div>
    )
}

export default DriTracker;