import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { IImage } from "../../App";

type ImageGalleryProps = {
  images: IImage[];
  onImageClick: (image: IImage) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <div className={css.galleryWrapper}>
      {!images.length ? (
        <p className={css.emptyMessage}>No images found. Try searching again.</p>
      ) : (
        <ul className={css.ImageGallery}>
          {images.map((image) => (
            <li className={css.ImageCard} key={image.id}>
              <ImageCard image={image} onClick={() => onImageClick(image)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageGallery;
