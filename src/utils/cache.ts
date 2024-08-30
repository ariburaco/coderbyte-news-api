interface CacheItem {
  value: any;
  expiration: number;
}

/**
 * Cache class that stores key-value pairs with an expiration time.
 * The cache is implemented as a Map, where the keys are the cache keys and the values are objects with the value and expiration time.
 * The cache uses a default TTL of 1 hour, but this can be customized by passing a different value to the constructor.
 */
class Cache {
  private store: Map<string, CacheItem>;
  private defaultTTL: number; // Time-to-live in milliseconds

  constructor(defaultTTL: number = 3600000) {
    // 1 hour default TTL
    this.store = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(key: string, value: any, ttl?: number) {
    const expiration = Date.now() + (ttl || this.defaultTTL);
    this.store.set(key, { value, expiration });
  }

  get(key: string): any | null {
    const cachedItem = this.store.get(key);
    if (!cachedItem) return null;

    if (cachedItem.expiration < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return cachedItem.value;
  }

  clear() {
    this.store.clear();
  }
}

const cache = new Cache();

export default cache;
