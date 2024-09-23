import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

interface ISearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Введите поисковый запрос!");
      return;
    }
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <header className={styles.searchHeader}>
      <form className={styles.searchForm} onSubmit={handleFormSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск изображений и фото"
        />
        <button className={styles.searchButton} type="submit">
          Найти
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
