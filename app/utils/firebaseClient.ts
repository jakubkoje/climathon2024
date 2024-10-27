// utils/firebaseClient.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const { firebase: firebaseConfig  } = useRuntimeConfig()

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);


export { storage, db };
