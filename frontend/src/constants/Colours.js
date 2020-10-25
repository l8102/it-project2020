import "../css/DefaultStyles.css"

// import the styles from the css
let style = getComputedStyle(document.getElementById('root'));

export const colours = {
  "blue": {
    "light": style.getPropertyValue('--light-blue'),
    "mid": style.getPropertyValue('--mid-blue'),
    "dark": style.getPropertyValue('--dark-blue')
  },
  "green": {
    "light": style.getPropertyValue('--light-green'),
    "mid": style.getPropertyValue('--mid-green'),
    "dark": style.getPropertyValue('--dark-green')
  },
  "yellow": {
    "light": style.getPropertyValue('--light-yellow'),
    "mid": style.getPropertyValue('--mid-yellow'),
    "dark": style.getPropertyValue('--dark-yellow')
  },
  "orange": {
    "light": style.getPropertyValue('--light-orange'),
    "mid": style.getPropertyValue('--mid-orange'),
    "dark": style.getPropertyValue('--dark-orange')
  },
  "red": {
    "light": style.getPropertyValue('--light-red'),
    "mid": style.getPropertyValue('--mid-red'),
    "dark": style.getPropertyValue('--dark-red')
  },
  "purple": {
    "light": style.getPropertyValue('--light-purple'),
    "mid": style.getPropertyValue('--mid-purple'),
    "dark": style.getPropertyValue('--dark-purple')
  }
}