const userNameSpliter = (user) => {
    let txt = ''
    const words = user.split(' ')

    if (words.length > 0) {
      words.forEach((item) => {
        txt += `${item[0].toUpperCase()}`
      })
      return txt
    }
  }

  export default userNameSpliter