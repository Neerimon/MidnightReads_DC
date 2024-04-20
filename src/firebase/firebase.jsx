import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth to get the auth instance
import firebaseConfig from '../firebase/firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

// Get instances of Storage, Firestore, and Auth
const storageInstance = getStorage(firebaseApp);
const firestoreInstance = getFirestore(firebaseApp);
const authInstance = getAuth(firebaseApp); // Get the auth instance

export { firebaseApp, storageInstance, firestoreInstance, authInstance }; // Export authInstance along with other instances
