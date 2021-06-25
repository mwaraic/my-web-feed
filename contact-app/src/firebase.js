import firebase from "firebase/app"
import "firebase/auth"

const app= firebase.initializeApp({
    apiKey: "AIzaSyAbBhzDX-bO4WiXzNo2YoVgwJk8XgF0nvw",
    authDomain: "my-web-feed.firebaseapp.com",
    projectId: "my-web-feed",
    storageBucket: "my-web-feed.appspot.com",
    messagingSenderId: "80623789",
    appId: "1:80623789:web:da53e7c6fbffb7bb082e24",
    measurementId: "G-PY7EKWMHCY"
})

export const auth=app.auth();
export default app;