import admin from 'firebase-admin'
import {Config} from "../config";


console.log('Initializing Firebase')

const serviceAccount = JSON.parse(Config.firebase.database.credentials)

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}


const firebaseDB = admin.firestore();

console.log('Firebase initialized')

export default firebaseDB