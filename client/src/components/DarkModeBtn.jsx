export default function DarkModeBtn({ darkMode, onToggle }) {
  return (
    <button type="button" aria-pressed={darkMode} onClick={onToggle}>
      {darkMode ? "☀ Light mode" : "☾ Dark mode"}
    </button>
  );
}
