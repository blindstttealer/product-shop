// utils/storage.ts

/**
 * Сохраняет значение в localStorage
 * @param key ключ
 * @param value любое значение (автоматически сериализуется в JSON)
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Ошибка при сохранении в localStorage [${key}]`, error);
  }
}


/**
 * Получает значение из localStorage
 * @param key ключ
 * @param defaultValue значение по умолчанию, если ничего не найдено или ошибка
 */
export function getLocalStorage<T>(key: string, defaultValue: T | undefined): T | undefined {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Ошибка при чтении из localStorage [${key}]`, error);
    return defaultValue;
  }
}


/**
 * Удаляет значение из localStorage
 * @param key ключ
 */
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Ошибка при удалении из localStorage [${key}]`, error);
  }
}
