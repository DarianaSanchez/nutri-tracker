import '../style.css';
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
        <div>
            <form onSubmit={handleForm}>
                <select 
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={handleChangeGender}
                    required
                >
                    <option value="female">female</option>
                    <option value="male">male</option>
                </select>
                <input
                    id="age"
                    name="age"
                    type="number"
                    value={age}
                    onChange={handleChangeAge}
                    min="1"
                    max="500"
                    placeholder="age"
                    required
                />
                <button>Show my DRI</button>
            </form>
            <table className={driTrack.length ? "visible" : "hidden"}>
                <thead>
                    <tr>
                        <th>Nutrient</th>
                        <th>DRI</th>
                        <th>Intake</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {driTrack.map(item => <DriItem key={item.id} driItem={item} driTrack={driTrack} dietTrack={dietTrack} />)}
                </tbody>
            </table>
        </div>
    )
}

export default DriTracker;