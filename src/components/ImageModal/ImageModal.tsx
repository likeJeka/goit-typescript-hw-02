import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { IImage } from "../../App";

interface ImageModalProps {
  isOpen: boolean;
  image: IImage | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, image, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.overlay}
      className={css.content}
      closeTimeoutMS={200}
    >
      <button className={css.closeButton} onClick={onClose}>
        &times; {/* Стандартный крестик */}
      </button>
      {image ? (
        <div>
          <img
            className={css.modalImg}
            src={image.urls.regular}
            alt={image.alt_description || "No description available"}
          />
          <h2 className={css.modalDescription}>
            {image.description || "No description available"}
          </h2>
          <p>
            by {image.user.name || "Unknown author"}
          </p>
          <p>Likes: {image.likes || 0}</p>
        </div>
      ) : (
        <p className={css.noImage}>No image selected</p>
      )}
    </Modal>
  );
};

export default ImageModal;
