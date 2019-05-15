export const saveItem = (key, data) => {
    if (process.client) {
        const existed = window.localStorage.getItem(key);
        if(existed) {
            window.localStorage.removeItem(key)
        }
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}

export const getItem = (key) => {
    if (process.client) {
        const data = window.localStorage.getItem(key);
        if(!data) return {};
        return JSON.parse(data);
    }
}