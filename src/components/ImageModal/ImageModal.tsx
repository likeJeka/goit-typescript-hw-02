import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface User {
  name: string;
}

interface Image {
  urls: {
    regular: string;
  };
  alt_description: string;
  description?: string;
  user: User;
  likes: number;
}

interface ImageModalProps {
  isOpen: boolean;
  image: Image | null;
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
        Close
      </button>
      {image ? (
        <>
          <img
            className={css.modalImg}
            src={image.urls.regular}
            alt={image.alt_description}
          />
          <h2 className={css.modalDescription}>
            {image.description || "No description"}
          </h2>
          <p>by {image.user.name}</p>
          <p>Likes: {image.likes}</p>
        </>
      ) : (
        <p>No image selected</p>
      )}
    </Modal>
  );
};

export default ImageModal;
