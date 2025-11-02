export const saveToLocalStorage = (key: string, payload: any) => {
  try {
    const raw = JSON.stringify(payload);
    localStorage.setItem(key, raw);
  } catch (e) {
    // fail silently (could also log)
    // console.warn("lsSave error", e);
  }
};

export const getFromLocalStorage = <T = any>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (e) {
    // console.warn("lsLoad error", e);
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // fail silently
    // console.warn("lsRemove error", e);
  }
};
