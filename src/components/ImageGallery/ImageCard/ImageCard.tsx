import { IImageBase } from "../../../App";


interface ImageCardProps {
  image: IImageBase;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div onClick={onClick}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};

export default ImageCard;
