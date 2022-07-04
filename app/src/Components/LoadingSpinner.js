import styles from './CSS/Spinner.module.css';
import loading from './CSS/240_F_142011702_j01lh1ctWhjN2gy6a0xI2YbhmB30QBsz.jpg';

export default function LoadingSpinner() {
    return (
      <div className={styles.Container}>
        <div className={styles.loadingSpinner}>
          <img src={loading} alt="Plane with loading banner"/>
        </div>
      </div>
    );
  }
