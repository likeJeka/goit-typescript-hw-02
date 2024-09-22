import React, { useState, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMorebtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";

const API_KEY = "O8xx4BoKhrynM_idIMcZNVlgm97d4XejwArnmPzdAZM";

interface BaseImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface CustomImage extends BaseImage {
  user: {
    name: string;
  };
  likes: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<CustomImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<CustomImage | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const galleryEndRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    setQuery(searchQuery);
    setPage(1);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: searchQuery, page: 1, per_page: 9 },
          headers: { Authorization: `Client-ID ${API_KEY}` },
        }
      );
      setImages(response.data.results);
    } catch (error) {
      setError("Не удалось загрузить изображения");
      toast.error("Не удалось загрузить изображения");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, page: page + 1, per_page: 9 },
          headers: { Authorization: `Client-ID ${API_KEY}` },
        }
      );
      setImages((prevImages) => [...prevImages, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
      setTimeout(() => {
        if (galleryEndRef.current) {
          galleryEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 400);
    } catch (error) {
      setError("Не удалось загрузить больше изображений");
      toast.error("Не удалось загрузить больше изображений");
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image: CustomImage) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !loading && !error && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
      <ImageModal
        isOpen={!!selectedImage}
        image={selectedImage}
        onClose={handleCloseModal}
      />
      <div ref={galleryEndRef} />
    </>
  );
};

export default App;
