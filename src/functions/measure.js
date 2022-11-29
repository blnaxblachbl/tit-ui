const measure = (item) => {
    return new Promise((resolve, reject) => {
        let ref = undefined
        if (item) {
            if (item.containerRef) {
                ref = item.containerRef
            } else {
                ref = item
            }
        }
        if (!ref) {
            reject(new Error("ref not provided"))
        } else {
            ref.measureInWindow((x, y, width, height) => resolve({
                x, y, width, height
            }))
        }
    })
}

export default measure