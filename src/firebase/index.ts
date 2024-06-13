import { getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import config from "@src/config";
const firebaseApp = initializeApp(config.firebase);

export const storage = getStorage(firebaseApp);

export const app = getApp();
