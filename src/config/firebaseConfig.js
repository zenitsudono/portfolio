// Set up your Firebase project: https://console.firebase.google.com/
// Create a Web App, initialize Firestore Database, and paste your credentials below:

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const isFirebaseConfigured = () => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey.trim() !== "" &&
    firebaseConfig.projectId.trim() !== ""
  );
};
