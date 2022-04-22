import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDS9ZHfFtE3A37MiHeB76JmmYSLfl3FIXY",
    authDomain: "restaurant-app-bfa38.firebaseapp.com",
    databaseURL: "https://restaurant-app-bfa38-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-bfa38",
    storageBucket: "restaurant-app-bfa38.appspot.com",
    messagingSenderId: "361071193947",
    appId: "1:361071193947:web:196face345f13023c7b47e"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage } 