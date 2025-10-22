class CacheService {
  private cacheMap: Map<
    string,
    {
      data: any;
      expiresAt: number;
    }
  > = new Map();

  constructor(private defaultMaxAge: number = 60000) {}

  get(key: string): any | null {
    const cachedItem = this.cacheMap.get(key);

    if (!cachedItem) return null;

    // Проверяем срок годности
    if (Date.now() > cachedItem.expiresAt) {
      this.cacheMap.delete(key);
      return null;
    }

    return cachedItem.data;
  }

  set(key: string, data: any, maxAge?: number): void {
    const finalMaxAge = maxAge ?? this.defaultMaxAge;
    this.cacheMap.set(key, {
      data,
      expiresAt: Date.now() + finalMaxAge,
    });
  }

  delete(key: string): void {
    this.cacheMap.delete(key);
  }

  clear(): void {
    this.cacheMap.clear();
  }
}

export default CacheService;
