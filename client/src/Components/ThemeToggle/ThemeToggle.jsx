import IconButton from "@mui/material/IconButton";
import { useThemeContext } from "../../Hooks/useTheme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Tooltip from "@mui/material/Tooltip";
export default function ThemeToggle() {
  const { ready, isDark, toggleMode } = useThemeContext();
  const label = isDark ? "Swtich To Light" : "Swich To Dark";
  return (
    <>
      <Tooltip title={label}>
        <span>
          <IconButton
            sx={{
              border: "1px solid white",
              color: "white",
              cursor: "pointer",
              width: "50px",
              height: "50px",
              p: 10,
            }}
            onClick={toggleMode}
            disabled={!ready}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}
