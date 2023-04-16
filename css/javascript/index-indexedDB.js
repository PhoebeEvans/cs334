const indexedDB = 
    window.indexedDB || 
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.simIndexedDB;

const request = indexedDB.open("ShopItemsDatabase", 1);

request.onerror = function (event) {
    console.error("An error occured with IndexedDB");
    console.error(event);
}

request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("Items", { keyPath: "id"});
    store.createIndex("foo", ["foo"], {unique: false});
}