import SearchIcon from '@mui/icons-material/Search';

const Search = ({ search, setSearch, setShowSearch, showSearch }) => {
  return (
    <div className="searching">
      {showSearch && (
        <input
          id="search"
          type="text"
          value={search}
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <SearchIcon className="search-area" onClick={() => setShowSearch(!showSearch)} />

    </div>);
}

export default Search;