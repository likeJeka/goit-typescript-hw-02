
import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

type BaseImage = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
};

type CustomImage = BaseImage & {
  user: {
    name: string;
  };
  likes: number;
};

type ImageGalleryProps = {
  images: CustomImage[];
  onImageClick: (image: CustomImage) => void;
};

const ImageGallery = ({ images, onImageClick }: ImageGalleryProps) => {
  if (!images.length) return null;

  const handleImageClick = (image: CustomImage) => {
    onImageClick(image);
  };

  const renderImages = () =>
    images.map((image) => (
      <li className={css.ImageCard} key={image.id}>
        <ImageCard image={image} onClick={() => handleImageClick(image)} />
      </li>
    ));

  return <ul className={css.ImageGallery}>{renderImages()}</ul>;
};

export default ImageGallery;
