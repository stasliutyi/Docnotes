import { MdSearch } from "react-icons/md";

interface SearchProps {
  handleSearchNote: (text: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearchNote }) => {
  return (
    <div className="flex items-center bg-gray-200 rounded-lg p-1 mb-6">
      <MdSearch size={20} className="text-gray-600 mr-2" />
      <input
        type="text"
        placeholder="Type to search..."
        onChange={(e) => handleSearchNote(e.target.value)}
        className="bg-gray-200 flex-1 border-none focus:outline-none p-1"
      />
    </div>
  );
};

export default Search;
