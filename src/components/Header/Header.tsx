interface HeaderProps {
  handleToggleDarkMode: (callback: (prev: boolean) => boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ handleToggleDarkMode }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notes</h1>
      <button
        onClick={() => handleToggleDarkMode((prev) => !prev)}
        className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
      >
        Toggle Mode
      </button>
    </div>
  );
};

export default Header;
