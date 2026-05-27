/**
 * JNS Express Delivery - Package Tracking Data System
 * Now upgraded to use Firebase Realtime Database for cross-device persistence.
 */

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// --- FIREBASE CONFIGURATION ---
// PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
  apiKey: "AIzaSyBgmCXogpKANHhEBUB8-iTzsIVriH9shRw",
  authDomain: "jns-logistics-290e0.firebaseapp.com",
  databaseURL: "https://jns-logistics-290e0-default-rtdb.firebaseio.com",
  projectId: "jns-logistics-290e0",
  storageBucket: "jns-logistics-290e0.firebasestorage.app",
  messagingSenderId: "263473026153",
  appId: "1:263473026153:web:9fd84c7cdfbfaac545bef8",
  measurementId: "G-E31W6F5LQS",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const DB_PATH = "packages";
const LOCAL_STORAGE_KEY = "jns_tracking_packages";

function loadLocalPackages() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("Failed to parse local package storage:", error);
    return {};
  }
}

function saveLocalPackages(packages) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(packages));
  } catch (error) {
    console.error("Failed to save local package storage:", error);
  }
}

function localPackageList() {
  return Object.values(loadLocalPackages());
}

function localPackageByCode(code) {
  const packages = loadLocalPackages();
  return packages[code.toUpperCase()] || null;
}

function localPackageSave(packageData) {
  const code = packageData.code.toUpperCase();
  const packages = loadLocalPackages();
  const data = {
    ...packageData,
    code,
    updatedAt: new Date().toISOString(),
  };
  packages[code] = data;
  saveLocalPackages(packages);
  return data;
}

function localPackageDelete(code) {
  const packages = loadLocalPackages();
  delete packages[code.toUpperCase()];
  saveLocalPackages(packages);
}

export const TrackingDB = {
  // Initialize DB with dummy data if it's the first time
  async init() {
    try {
      const snapshot = await get(child(ref(db), DB_PATH));
      if (!snapshot.exists()) {
        const initialData = {
          JNS123456789: {
            code: "JNS123456789",
            lat: 40.7128,
            lng: -74.006,
            status: "In Transit",
            onHold: false,
            updatedAt: new Date().toISOString(),
            locationName: "New York, USA",
            customerName: "John Doe",
            customerContact: "+1 (555) 000-1111",
            deliveryAddress: "123 Logistics Way, Brooklyn, NY 11201",
            itemsDescription: "Electronics, MacBook Pro, and Accessories",
            paymentPaid: 1500,
            paymentBalance: 200,
            paymentHoldAmount: 0,
            movementLogs: [
              {
                timestamp: new Date().toISOString(),
                location: "Sorting Facility, NY",
                status: "In Transit",
              },
            ],
            images: [],
          },
        };
        await set(ref(db, DB_PATH), initialData);
      }
    } catch (error) {
      console.error("TrackingDB init failed:", error);
      if (!Object.keys(loadLocalPackages()).length) {
        saveLocalPackages({
          JNS123456789: {
            code: "JNS123456789",
            lat: 40.7128,
            lng: -74.006,
            status: "In Transit",
            onHold: false,
            updatedAt: new Date().toISOString(),
            locationName: "New York, USA",
            customerName: "John Doe",
            customerContact: "+1 (555) 000-1111",
            deliveryAddress: "123 Logistics Way, Brooklyn, NY 11201",
            itemsDescription: "Electronics, MacBook Pro, and Accessories",
            paymentPaid: 1500,
            paymentBalance: 200,
            paymentHoldAmount: 0,
            movementLogs: [
              {
                timestamp: new Date().toISOString(),
                location: "Sorting Facility, NY",
                status: "In Transit",
              },
            ],
            images: [],
          },
        });
      }
    }
  },

  async getAll() {
    try {
      const snapshot = await get(child(ref(db), DB_PATH));
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
    } catch (error) {
      console.error("TrackingDB getAll failed:", error);
      return localPackageList();
    }
    return localPackageList();
  },

  async getByCode(code) {
    try {
      const snapshot = await get(
        child(ref(db), `${DB_PATH}/${code.toUpperCase()}`),
      );
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return localPackageByCode(code);
    } catch (error) {
      console.error(
        "TrackingDB getByCode failed, falling back to local storage:",
        error,
      );
      return localPackageByCode(code);
    }
  },

  async save(packageData) {
    const code = packageData.code.toUpperCase();
    const data = {
      ...packageData,
      code: code,
      updatedAt: new Date().toISOString(),
    };

    try {
      await set(ref(db, `${DB_PATH}/${code}`), data);
      return true;
    } catch (error) {
      console.error("TrackingDB save failed, saving locally instead:", error);
      localPackageSave(data);
      return true;
    }
  },

  async delete(code) {
    try {
      await remove(ref(db, `${DB_PATH}/${code.toUpperCase()}`));
      return true;
    } catch (error) {
      console.error(
        "TrackingDB delete failed, deleting locally instead:",
        error,
      );
      localPackageDelete(code);
      return true;
    }
  },

  generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "JNS";
    for (let i = 0; i < 9; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },
};
