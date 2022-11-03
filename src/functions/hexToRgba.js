
export default (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    if (alpha && 0 < parseInt(alpha) < 1) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
    } else {
        return `rgb(${r}, ${g}, ${b})`
    }
}