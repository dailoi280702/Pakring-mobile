import { getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({});

export const storage = getStorage(firebaseApp);

export const app = getApp();
