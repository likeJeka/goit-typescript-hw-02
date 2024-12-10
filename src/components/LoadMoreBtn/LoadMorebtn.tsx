import styles from "./LoadMoreBtn.module.css";

interface ILoadMoreButtonProps {
  handleClick: () => void;
  isLoading?: boolean; 
}

const LoadMoreButton: React.FC<ILoadMoreButtonProps> = ({
  handleClick,
  isLoading = false,
}) => {
  return (
    <button
      className={styles.loadMoreButton}
      onClick={handleClick}
      disabled={isLoading}
      aria-label="Load more images"
    >
      {isLoading ? "Загрузка..." : "Показать больше"}
    </button>
  );
};

export default LoadMoreButton;
