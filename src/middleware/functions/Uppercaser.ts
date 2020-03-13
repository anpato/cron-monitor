export default (str:string) => {
  if (!str.includes('_')) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } else {
    const strings:string[] = str.split('_')
    let newStr:string = ''
    strings.forEach((string:string) => {
      newStr += `${string.charAt(0).toUpperCase() + string.slice(1)} `
    })
    return newStr
  }
}
