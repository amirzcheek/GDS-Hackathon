const firebase = require("firebase/app");
const firebaseLite = require("firebase/firestore/lite");
const configs = require("../config.js");

const firebaseConfig = configs.firebaseConfig;

let app;
let db;

const connect = async () => {
  app = firebase.initializeApp(firebaseConfig);
  db = firebaseLite.getFirestore(app);
};

const getDocs = async () => {
  const attractions = await firebaseLite.collection(db, "attractions");
  const attractionsSnapshot = await firebaseLite.getDocs(attractions);
  const attractionList = await attractionsSnapshot.docs.map((doc) =>
    doc.data()
  );
  return attractionList;
};

module.exports = { connect, getDocs };
