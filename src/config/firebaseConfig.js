// Set up your Firebase project: https://console.firebase.google.com/
// Create a Web App, initialize Firestore Database, and paste your credentials below:

export const firebaseConfig = {
  apiKey: "AIzaSyDezwagspYuyLF3slsrL-Y_ikH2vpUan-Y",
  authDomain: "portfolio-salmi.firebaseapp.com",
  projectId: "portfolio-salmi",
  storageBucket: "portfolio-salmi.firebasestorage.app",
  messagingSenderId: "63080879960",
  appId: "1:63080879960:web:221edd0a5ea8b075e7772d"
};

export const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey.trim() !== "" &&
    firebaseConfig.projectId.trim() !== ""
  );
};
