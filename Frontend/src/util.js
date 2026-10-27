export function parseTimestamp(ts) {
    if (ts === null || ts === undefined) {
        throw new Error("Timestamp is invalid.")
    }

    const iso = ts.includes("T") ? ts : ts.replace(" ", "T")
    const hasZone = /[zZ]$|[+-]\d{2}:?\d{2}$/.test(iso)
    const ms = new Date(hasZone ? iso : iso + "Z").getTime()

    if (isNaN(ms)) {
        return NaN
    }

    return ms
}

export function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}
