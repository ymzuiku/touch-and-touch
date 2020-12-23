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

  const collection = <T>(key: string, initData: T) => {
    return {
      find: async (filter?: T) => {
        const coll = await initColl(key);
        if (!filter) {
          return coll;
        }
        const keys = Object.keys(filter!);
        return coll.filter((item: any) => {
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
      },
      findOne: async (filter: T) => {
        const coll = await initColl(key);
        const keys = Object.keys(filter);
        return coll.find((item: any) => {
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
      },
      deleteMany: async (filter: T) => {
        const coll = await initColl(key);
        const keys = Object.keys(filter);
        const next = [] as T[];
        const del = [] as T[];
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
            del.push(item);
          }
        });
        await micoDb.set(key, next);
        return del;
      },
      deleteOne: async (filter: T) => {
        const coll = await initColl(key);
        const keys = Object.keys(filter);
        const next = [] as T[];
        const del = [] as T[];
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
            del.push(item);
          }
        });
        await micoDb.set(key, next);
        return del;
      },
      updateOne: async (filter: T, data: T): Promise<T> => {
        const coll = await initColl(key);
        const keys = Object.keys(filter);
        let out: any;
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
        return out;
      },
      updateMany: async (filter: T, data: T): Promise<T[]> => {
        const coll = await initColl(key);
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
        return out;
      },
      insertOne: async (data: T) => {
        const coll = await initColl(key);
        coll.push(data);
        await micoDb.set(key, coll);
        return coll;
      },
      insertMany: async (dataList: T[]) => {
        const coll = await initColl(key);
        const next = coll.concat(dataList);
        await micoDb.set(key, next);
        return coll;
      },
      duplicateRemova: async (key: string) => {
        const coll = await initColl(key);
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
        return out;
      },
      fullCoverage: (dataList: T[]) => {
        return micoDb.set(key, dataList);
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
