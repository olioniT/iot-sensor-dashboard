export function parseTimestamp(ts) {
    const iso = ts.includes("T") ? ts : ts.replace(" ", "T")
    const hasZone = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(iso)
    return new Date(hasZone ? iso : iso + "Z").getTime()
}

export function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}
