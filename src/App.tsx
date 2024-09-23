import React, { useState, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreButton from "./components/LoadMoreBtn/LoadMorebtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";

const API_KEY = "O8xx4BoKhrynM_idIMcZNVlgm97d4XejwArnmPzdAZM";

interface IImageBase {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface IImage extends IImageBase {
  user: {
    name: string;
  };
  likes: number;
}

const App: React.FC = () => {
  const [imageList, setImageList] = useState<IImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<IImage | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const galleryEndRef = useRef<HTMLDivElement | null>(null);

  const fetchImages = async (query: string, page: number) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, page, per_page: 9 },
          headers: { Authorization: `Client-ID ${API_KEY}` },
        }
      );
      return response.data.results;
    } catch {
      setErrorMsg("Не удалось загрузить изображения");
      toast.error("Не удалось загрузить изображения");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
    const images = await fetchImages(query, 1);
    setImageList(images);
  };

  const loadMoreImages = async () => {
    const newPage = currentPage + 1;
    const newImages = await fetchImages(searchTerm, newPage);
    setImageList((prevImages) => [...prevImages, ...newImages]);
    setCurrentPage(newPage);
    setTimeout(() => {
      if (galleryEndRef.current) {
        galleryEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 400);
  };

  const handleImageClick = (image: IImage) => {
    setActiveImage(image);
  };

  const closeImageModal = () => {
    setActiveImage(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} /> {}
      {errorMsg && <ErrorMessage message={errorMsg} />}
      {isLoading && <Loader />}
      <ImageGallery images={imageList} onImageClick={handleImageClick} />
      {imageList.length > 0 && !isLoading && !errorMsg && (
        <LoadMoreButton handleClick={loadMoreImages} />
      )}
      <ImageModal
        isOpen={!!activeImage}
        image={activeImage}
        onClose={closeImageModal}
      />
      <div ref={galleryEndRef} />
    </>
  );
};

export default App;
