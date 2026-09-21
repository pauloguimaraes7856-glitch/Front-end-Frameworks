type SearchBarProps = {
  query: string;
  onChange: (newQuery: string) => void;
};

const SearchBar = ({ query, onChange }: SearchBarProps) => {
  return (
    <div className="header-search">
      <input
        type="text"
        className="search-input"
        placeholder="Search movies, plot keywords, titles..."
        autoComplete="off"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;