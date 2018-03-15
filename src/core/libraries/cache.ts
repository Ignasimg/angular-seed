interface cacheEntry<T> {
  entry: T,
  time: number,
}

export class Cache<T> {
  private _entries: Map<string, cacheEntry<T>>;

  constructor(
    private _TTL: number = 0
  ) {
    this._entries = new Map<string, cacheEntry<T>>();
  }

  clear() {
    this._entries.clear();
  }

  invalidate(key: string, andChilds: boolean) {
    if (andChilds) {
      let filter = new RegExp('^'+key);
      let toDelete: string[] = [];
      this._entries.forEach((v: any, k: string) => {
        if (filter.test(k))
          toDelete.push(k);
      });

      toDelete.forEach((e: string) => {
        this._entries.delete(e);
      });
    }
    else {
      this._entries.delete(key);
    }
  }

  has(key: string): boolean {
    return this._entries.has(key) && (this._entries.get(key).time + this._TTL) < +new Date();
  }

  get(key: string): T {
    return this._entries.get(key).entry;
  }

  set(key: string, value: T) {
    this._entries.set(key, {entry: value, time: +new Date()});
  }
}