export const saveItem = (key, data) => {
    const existed = localStorage.getItem(key);
    if(existed) {
        localStorage.removeItem(key)
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export const getItem = (key) => {
    const data = localStorage.getItem(key);
    if(!data) return {};
    return JSON.parse(data);
}