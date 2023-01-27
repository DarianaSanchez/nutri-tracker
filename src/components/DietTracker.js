import styles from "../style.module.css";
import DietItem from "./DietItem";

const DietTracker = ({ dietTrack, setDietTrack }) => {
    return (
        <div className={styles.section}>
            {dietTrack.map(item => <DietItem key={item.fdcId} dietItem={item} dietTrack={dietTrack} setDietTrack={setDietTrack}></DietItem>)}
        </div>
    )
}

export default DietTracker;