import { useContext } from "react";
import { ThemeModeContext } from "../Context/ThemeModeContext";


export const useThemeContext = () => {
    const context = useContext(ThemeModeContext)

    if (!context) {
        throw new Error("no theme provider. ")
    }
    return context;
}
