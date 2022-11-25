const measure = (item) => {
    if (!item) {
        return null
    }
    return new Promise(resolve => item.measureInWindow((x, y, width, height) => resolve({
        x, y, width, height
    })))
}

export default measure