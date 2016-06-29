export function getFormattedTime(timestamp) {
    const time = new Date(timestamp);
    return `${ time.toLocaleDateString() } ${ time.getHours() }:${ time.getMinutes() }`;
}