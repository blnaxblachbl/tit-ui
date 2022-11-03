const wordsFromUpperCase = (string) => {
    try {
        let str = string.toString()
        return str.replace(/(?:^|\s)\S/g, l => { return l.toUpperCase() })
    } catch (e) {
        return e
    }
}

export {
    wordsFromUpperCase,
}