export function nowTimestamp(date?: Date): number {
    if (!date) date = new Date();
    return Math.floor(date.getTime() / 1000);
}