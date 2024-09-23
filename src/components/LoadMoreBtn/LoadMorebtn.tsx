
import styles from "./LoadMoreBtn.module.css";

interface ILoadMoreButtonProps {
  handleClick: () => void;
}

const LoadMoreButton: React.FC<ILoadMoreButtonProps> = ({ handleClick }) => {
  return (
    <button className={styles.loadMoreButton} onClick={handleClick}>
      Показать больше
    </button>
  );
};

export default LoadMoreButton;
