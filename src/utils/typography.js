import Typography from "typography"
// import funstonTheme from "typography-theme-funston"
import parnassusTheme from "typography-theme-parnassus"

parnassusTheme.baseLineHeight = 1.7
const typography = new Typography(parnassusTheme)

export default typography
export const rhythm = typography.rhythm
