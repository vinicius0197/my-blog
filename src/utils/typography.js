import Typography from "typography"
import funstonTheme from 'typography-theme-funston'

funstonTheme.baseLineHeight = 1.5;
const typography = new Typography(funstonTheme)

export default typography
export const rhythm = typography.rhythm