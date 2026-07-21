/* === Local storage block */

/* --- Get storage */
export function getStorage(key: string): string | null {
    return localStorage.getItem(key);
}

/* --- Set storage */
export function setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
}

/* --- Remove storage */
export function removeStorage(key: string) {
    localStorage.removeItem(key);
}

/* --- Clear storage */
export function clearStorage() {
    localStorage.clear();
}