import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { API_KEY } from '@env';

    const firebaseConfig = {
        apiKey: { API_KEY },
        authDomain: "tfwapp-55f8b.firebaseapp.com",
        projectId: "tfwapp-55f8b",
        storageBucket: "tfwapp-55f8b.appspot.com",
        messagingSenderId: "549788474311",
        appId: "1:549788474311:web:146a77a5879d5b2f15d7e2"
    };
      
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    export default database;