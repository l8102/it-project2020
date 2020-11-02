import "../css/DefaultStyles.css"

// Returns all the colour variants for one specific colour (light, mid, dark)
export function getColours(style, colour) {

  if (colour === "blue") {
    return (
      {
        "light": style.getPropertyValue('--light-blue'),
        "mid": style.getPropertyValue('--mid-blue'),
        "dark": style.getPropertyValue('--dark-blue')
      }
    )
  }
  if (colour === "green") {
    return (
      {
        "light": style.getPropertyValue('--light-green'),
        "mid": style.getPropertyValue('--mid-green'),
        "dark": style.getPropertyValue('--dark-green')
      }
    )
  }
  if (colour === "yellow") {
    return (
      {
        "light": style.getPropertyValue('--light-yellow'),
        "mid": style.getPropertyValue('--mid-yellow'),
        "dark": style.getPropertyValue('--dark-yellow')
      }
    )
  }
  if (colour === "orange") {
    return (
      {
        "light": style.getPropertyValue('--light-orange'),
        "mid": style.getPropertyValue('--mid-orange'),
        "dark": style.getPropertyValue('--dark-orange')
      }
    )
  }
  if (colour === "red") {
    return (
      {
        "light": style.getPropertyValue('--light-red'),
        "mid": style.getPropertyValue('--mid-red'),
        "dark": style.getPropertyValue('--dark-red')
      }
    )
  }
  if (colour === "purple") {
    return (
      {
        "light": style.getPropertyValue('--light-purple'),
        "mid": style.getPropertyValue('--mid-purple'),
        "dark": style.getPropertyValue('--dark-purple')
      }
    )
  }
}