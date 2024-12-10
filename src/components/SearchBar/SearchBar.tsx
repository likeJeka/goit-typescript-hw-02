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
    if (searchTerm.trim().length < 3) {
      toast.error("Введите не менее 3 символов для поиска!");
      return;
    }
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input
          className={styles.input}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск изображений и фото"
          aria-label="Search images input"
        />
        <button
          className={styles.btn}
          type="submit"
          disabled={!searchTerm.trim()} 
          aria-label="Search button"
        >
          Найти
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
