// High-Fidelity Firebase Messaging Service Worker
// This script enables background notification handling for the Unified Campaigns experience.

importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

// These values are public and safe to include in the service worker.
// They must match your src/firebase/config.ts
firebase.initializeApp({
  apiKey: "AIzaSyAtxHKq0WrGZHthYdKIAxnkChJnQhWzxv4",
  authDomain: "sherazhussain546-201av.firebaseapp.com",
  projectId: "sherazhussain546-201av",
  storageBucket: "sherazhussain546-201av.appspot.com",
  messagingSenderId: "92258735049",
  appId: "1:92258735049:web:c8a6882bb413ff3d9b0e18"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/founder.jpg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
