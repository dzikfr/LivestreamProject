const SearchBar = ({ searchTerm, setSearchTerm, labels }) => {
  const label = labels.join(", "); 

  return (
    <input
      type="text"
      placeholder={`Cari berdasarkan ${label}`}
      className="input input-bordered w-full mb-4"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBar;
