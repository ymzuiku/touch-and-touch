export function parseObj(obj: string) {
  if (obj && (obj[0] === "[" || obj[0] === "{")) {
    try {
      return JSON.parse(obj);
    } catch (err) {
      return obj;
    }
  }
  const value = Number(obj);
  return isNaN(value) ? obj : value;
}

// 创建一个区别独立 key 前缀的 MicoDb
export const createMicoDb = (name = "mico-db") => {
  let db: IDBDatabase;
  const setStorage = (type: string, key: string, obj: any) => {
    const fn = (window as any)[type];
    key = micoDb.name + micoDb.version + "_" + key;
    if (typeof obj === "object") {
      fn.setItem(key, JSON.stringify(obj));
    } else {
      fn.setItem(key, obj);
    }
  };
  const getStorage = (type: string, key: string) => {
    const fn = (window as any)[type];
    const obj = fn.getItem(micoDb.name + micoDb.version + "_" + key);
    return parseObj(obj);
  };

  const removeStorage = (type: string, key: string) => {
    const fn = (window as any)[type];
    fn.removeItem(micoDb.name + micoDb.version + "_" + key);
  };

  function initDb(store: string) {
    return new Promise((res) => {
      if (!db) {
        const reqDb = window.indexedDB.open(micoDb.name, micoDb.version);
        reqDb.onerror = console.error;
        reqDb.onsuccess = (event: any) => {
          if (!db) {
            db = event.target.result;
          }
          res(void 0);
        };
        reqDb.onupgradeneeded = function (event: any) {
          if (!db) {
            db = event.target.result;
          }
          db.createObjectStore(store, { keyPath: "_id" });
        };
      } else {
        res(void 0);
      }
    });
  }

  async function initColl<T>(key: string): Promise<T[]> {
    let coll = (await micoDb.get(key)) as any[];
    if (!coll) {
      coll = [];
      micoDb.set(key, coll);
    }
    return coll;
  }

  interface ProxyReturnOne<T> {
    filter: T;
    data: T;
  }

  interface ProxyReturnMany<T> {
    filter: T;
    data: T[];
  }

  interface ProxyCollection<T> {
    onChange?: (dataList: T[]) => any;
    find?: (filter: T, data: T[]) => any;
    findOne?: (filter: T, data?: T) => any;
    deleteOne?: (filter: T, data?: T) => any;
    deleteMany?: (filter: T, data: T[]) => any;
    updateOne?: (filter: T, inputData: T, returnData?: T) => any;
    updateMany?: (filter: T, inputData: T, returnData: T[]) => any;
    insertOne?: (inputData: T) => any;
    insertMany?: (inputList: T[]) => any;
    removeDuplicatie?: (key: string, returnData: T[]) => any;
  }

  interface CollectionOptions<T> {
    initData?: T;
    proxy?: ProxyCollection<T>;
  }

  const collection = <T>(key: string, opt: CollectionOptions<T> = {}) => {
    if (!opt.proxy) {
      opt.proxy = {};
    }
    return {
      find: async (filter?: T) => {
        const coll = await initColl<T>(key);
        if (!filter) {
          return coll;
        }
        const keys = Object.keys(filter!);
        const out = coll.filter((item: any) => {
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          return isPick;
        });
        if (opt.proxy!.find) {
          await Promise.resolve(opt.proxy!.find(filter, out));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return out;
      },
      findOne: async (filter: T) => {
        const coll = await initColl<T>(key);
        const keys = Object.keys(filter);
        const out = coll.find((item: any) => {
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          return isPick;
        });
        if (opt.proxy!.findOne) {
          await Promise.resolve(opt.proxy!.findOne(filter, out));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return out;
      },
      deleteMany: async (filter: T) => {
        const coll = await initColl<T>(key);
        const keys = Object.keys(filter);
        const next = [] as T[];
        const out = [] as T[];
        coll.forEach((item: any) => {
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          if (!isPick) {
            next.push(item);
          } else {
            out.push(item);
          }
        });
        await micoDb.set(key, next);
        if (opt.proxy!.deleteMany) {
          await Promise.resolve(opt.proxy!.deleteMany(filter, out));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return out;
      },
      deleteOne: async (filter: T): Promise<T | undefined> => {
        const coll = await initColl<T>(key);
        const keys = Object.keys(filter);
        const next = [] as T[];
        let del: T | undefined;
        coll.forEach((item: any) => {
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          if (del) {
            next.push(item);
          } else if (!isPick) {
            next.push(item);
          } else {
            del = item;
          }
        });
        await micoDb.set(key, next);
        if (opt.proxy!.deleteOne) {
          await Promise.resolve(opt.proxy!.deleteOne(filter, del));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return del;
      },
      updateOne: async (filter: T, data: T): Promise<T | undefined> => {
        const coll = await initColl<T>(key);
        const keys = Object.keys(filter);
        let out: T | undefined;
        for (let index = 0; index < coll.length; index++) {
          const item = coll[index] as any;
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          if (isPick) {
            Object.assign(item, data);
            out = item;
            break;
          }
        }
        await micoDb.set(key, coll);
        if (opt.proxy!.updateOne) {
          await Promise.resolve(opt.proxy!.updateOne(filter, data, out));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return out;
      },
      updateMany: async (filter: T, data: T): Promise<T[]> => {
        const coll = await initColl<T>(key);
        const keys = Object.keys(filter);
        const out = [] as T[];
        for (let index = 0; index < coll.length; index++) {
          const item = coll[index] as any;
          let isPick = false;
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if ((filter as any)[key] === item[key]) {
              isPick = true;
              break;
            }
          }
          if (isPick) {
            Object.assign(item, data);
            out.push(item);
          }
        }
        await micoDb.set(key, coll);
        if (opt.proxy!.updateMany) {
          await Promise.resolve(opt.proxy!.updateMany(filter, data, out));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return out;
      },
      insertOne: async (data: T) => {
        const coll = await initColl<T>(key);
        coll.push(data);
        await micoDb.set(key, coll);
        if (opt.proxy!.insertOne) {
          await Promise.resolve(opt.proxy!.insertOne(data));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return coll;
      },
      insertMany: async (dataList: T[]) => {
        const coll = await initColl<T>(key);
        const next = coll.concat(dataList);
        await micoDb.set(key, next);
        if (opt.proxy!.insertMany) {
          await Promise.resolve(opt.proxy!.insertMany(dataList));
        }
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
        return coll;
      },
      removeDuplicatie: async (key: string): Promise<T[]> => {
        const coll = await initColl<T>(key);
        const out = [] as T[];
        const set = new Set();
        for (let index = 0; index < coll.length; index++) {
          const item = coll[index] as any;
          const val = item[key];
          if (val === void 0) {
            out.push(item);
            continue;
          }
          if (!set.has(val)) {
            set.add(val);
            out.push(item);
          }
        }
        await micoDb.set(key, out);
        if (opt.proxy!.removeDuplicatie) {
          await Promise.resolve(opt.proxy!.removeDuplicatie(key, out));
        }
        if (opt.proxy && opt.proxy.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy.onChange(all));
        }
        return out;
      },
      fullCoverage: async (dataList: T[]): Promise<void> => {
        await micoDb.set(key, dataList);
        if (opt.proxy!.onChange) {
          const all = await micoDb.get(key);
          await Promise.resolve(opt.proxy!.onChange(all));
        }
      },
    };
  };

  const micoDb = {
    name,
    isHaveIndexedDb: typeof window.indexedDB !== "undefined",
    version: 1,
    /** remove indexedDb by key */
    remove: (key: string): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!micoDb.isHaveIndexedDb) {
          return res(micoDb.removeLocalStorage(key));
        }
        const store = micoDb.name + micoDb.version;
        initDb(store).then(() => {
          if (db.objectStoreNames.contains(store)) {
            const transaction = db.transaction([store], "readwrite");
            const objectStore = transaction.objectStore(store);
            const request = objectStore.delete(key);
            request.onerror = (err) => {
              console.error(err);
              res(void 0);
            };
            request.onsuccess = res;
          } else {
            res(void 0);
          }
        });
      });
    },
    collection,
    /** get indexedDb by key */
    get: (key: string): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!micoDb.isHaveIndexedDb) {
          return res(micoDb.getLocalStorage(key));
        }
        const store = micoDb.name + micoDb.version;
        initDb(store).then(() => {
          if (db.objectStoreNames.contains(store)) {
            const transaction = db.transaction([store]);
            const objectStore = transaction.objectStore(store);
            const request = objectStore.get(key);
            request.onsuccess = function (event: any) {
              const result = event.target.result;
              res(result && result.obj);
            };
          } else {
            res(void 0);
          }
        });
      });
    },
    /** set indexedDb by key */
    set: (key: string, obj: any): Promise<any> => {
      return new Promise((res) => {
        if (!key) {
          return res(void 0);
        }
        if (!micoDb.isHaveIndexedDb) {
          return res(micoDb.setLocalStorage(key, obj));
        }
        const store = micoDb.name + micoDb.version;
        initDb(store).then(() => {
          if (db.objectStoreNames.contains(store)) {
            const transaction = db.transaction([store], "readwrite");
            const objectStore = transaction.objectStore(store);
            const request = objectStore.put({
              obj,
              _id: key,
            });
            request.onerror = (err) => {
              console.error(err);
              res(void 0);
            };
            request.onsuccess = res;
          } else {
            res(void 0);
          }
        });
      });
    },
    setLocalStorage: (key: string, obj: any) => {
      setStorage("localStorage", key, obj);
    },
    getLocalStorage: (key: string) => {
      return getStorage("localStorage", key);
    },
    removeLocalStorage: (key: string) => {
      removeStorage("localStorage", key);
    },
    setSessionStorage: (key: string, obj: any) => {
      setStorage("sessionStorage", key, obj);
    },
    getSessionStorage: (key: string) => {
      return getStorage("sessionStorage", key);
    },
    removeSessionStorage: (key: string) => {
      removeStorage("sessionStorage", key);
    },
  };
  return micoDb;
};

export default createMicoDb();
