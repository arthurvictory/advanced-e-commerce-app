export function saveToSession<CartItems>(key:string, value:CartItems): void {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function loadFromSession<CartItems>(key: string): CartItems | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) as CartItems : null;
}