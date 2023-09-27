export default await (async () => {

    //indexDB
    const db = async function (db_name) {
        const database = await (new Promise((resolve, reject) => {
            let request = (
                this.indexedDB ||
                this.mozIndexedDB ||
                this.webkitIndexedDB ||
                this.msIndexedDB
            ).open(db_name);
            request.οnerrοr = function (event) {
                reject("Something bad happend while trying to open database:" + event.target.errorCode);
            };
            request.onsuccess = function (event) {
                resolve(event.target.result);
            };
        }))
        return {
            index: database,
            createTable: async function (table_name, main_key = 'key') {
                objectStore = db.createObjectStore(table_name, {
                    keyPath: main_key
                });
                return await this.table(table_name);
            },
            table: async function (table_name) {
                return {
                    index: this.index
                        .transaction([table_name], "readwrite") // 事务对象
                        .objectStore(table_name),
                    add(json) {
                        const request=this.index.add(json),_this = this;
                        return new Promise((resolve, reject) => {
                            request.onsuccess = function (event) {
                                resolve(_this);
                            };
                            request.onerror = function (event) {
                                reject("Write data unsuccessfully");
                            };
                        })
                    },
                    put(json) {
                        const request=this.index.put(json),_this = this;
                        return new Promise((resolve, reject) => {
                            request.onsuccess = function (event) {
                                resolve(_this);
                            };
                            request.onerror = function (event) {
                                reject("Write data unsuccessfully");
                            };
                        })
                    },
                    get(main_key) {
                        const request=this.index.get(json)
                        return new Promise((resolve, reject) => {
                            request.onerror = function (event) {
                                reject("Read data unsuccessfully");
                            };
                            request.onsuccess = function (event) {
                                resolve(request.result);
                            };
                        });
                    },
                    cursor(func) {
                        const request = this.index.openCursor(),_this=this; // 指针对象
                        return new Promise((resolve, reject) => {
                            request.onsuccess = function (e) {
                                if (!e.target.result)resolve(_this);
                                else if(func(e.target.result.value) !== false)e.target.result.continue;
                            };
                        })
                    },
                    find(key_name, value) {
                        const request = this.index.index(key_name).get(value),_this=this; // 指针对象
                        return new Promise((resolve, reject) => {
                            request.onerror = function (event) {
                                reject("Read data unsuccessfully");
                            };
                            request.onsuccess = function (event) {
                                resolve(request.result);
                            };
                        });
                    },
                    del(main_key) {
                        const request = this.index.index(key_name).get(value),_this=this; // 指针对象
                        return new Promise((resolve, reject) => {
                            request.onerror = function (event) {
                                reject("Read data unsuccessfully");
                            };
                            request.onsuccess = function (event) {
                                resolve(_this);
                            };
                        });
                    },
                }
            },
            close(){
                this.index.close();
            }
        };
    }

    return {
        db:db,
    };
})()