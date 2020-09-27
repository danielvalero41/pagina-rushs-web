importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBp1783gdPEqlokp-CQBDmKl3BEh3vqnnM",
    authDomain: "web-rushs.firebaseapp.com",
    databaseURL: "https://web-rushs.firebaseio.com",
    projectId: "web-rushs",
    storageBucket: "web-rushs.appspot.com",
    messagingSenderId: "776121294983",
    appId: "1:776121294983:web:b442bd1f6ceaaaaa17d822"
})

const messaging = firebase.messaging();