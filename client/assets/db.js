let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
  db = event.target.result;
  db.createObjectStore("budget", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;
  console.log(db)
  initiate();

};

request.onerror = function(event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  return new Promise((resolve, reject) => {

    const transaction = db.transaction(["budget"], "readwrite");
    const store = transaction.objectStore("budget");

    store.add(record);
  })
}

function checkDatabase() {
  return new Promise((resolve, reject)=>{
  console.log(db)
  const transaction = db.transaction(["budget"], "readwrite");
  const store = transaction.objectStore("budget");
  
  const getAll = store.getAll();

  getAll.onsuccess = function() {
      resolve(getAll.result);
    
  };
})}

// listen for app coming back online
window.addEventListener("online", checkDatabase);