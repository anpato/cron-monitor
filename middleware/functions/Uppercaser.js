module.exports = str => {
  if (!str.includes('_')) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } else {
    const strings = str.split('_')
    let newStr = ''
    strings.forEach(string => {
      newStr += `${string.charAt(0).toUpperCase() + string.slice(1)} `
    })
    return newStr
  }
}
