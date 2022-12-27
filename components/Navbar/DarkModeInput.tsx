import { useTheme } from "next-themes";

const DarkModeInput = () => {
  const { theme, setTheme } = useTheme();

  const themeHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center mr-2">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={themeHandler}
      />
      <label
        htmlFor="checkbox"
        className="flexBetween bg-black relative rounded-2xl w-8 h-4 p-1 label cursor-pointer"
      >
        <i className="fas fa-sun" />
        <i className="fas fa-moon" />
        <div className="absolute bg-white rounded-full ball w-3 h-3" />
      </label>
    </div>
  );
};

export default DarkModeInput;
