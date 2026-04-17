import { useAppContext } from '../context/AppContext';
import { lightColors, darkColors, type AppColors } from '../constants/theme';

export function useTheme(): AppColors {
  const { isDarkMode } = useAppContext();
  return isDarkMode ? darkColors : lightColors;
}
