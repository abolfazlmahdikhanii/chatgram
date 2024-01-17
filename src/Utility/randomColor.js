  const getRandomValue = () => {
    const colors = [
        'red',
        'blue',
        'green',
        'yellow',
        'indigo',
        'purple',
        'rose',
        'violet'
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

export default getRandomValue
