import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "../config/firebaseConfig";

let db = null;

if (isFirebaseConfigured()) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
}

// Local Storage Helper functions to simulate database behavior
const getLocalMessages = () => {
  const data = localStorage.getItem("portfolio_messages");
  return data ? JSON.parse(data) : [];
};

const saveLocalMessages = (messages) => {
  localStorage.setItem("portfolio_messages", JSON.stringify(messages));
};

export const saveMessage = async (name, email, message) => {
  const timestamp = new Date().toISOString();
  
  if (db) {
    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        timestamp
      });
      return { success: true };
    } catch (error) {
      console.error("Firestore save error, falling back to LocalStorage:", error);
    }
  }
  
  // LocalStorage Fallback
  const messages = getLocalMessages();
  messages.push({
    id: 'local_' + Math.random().toString(36).substr(2, 9),
    name,
    email,
    message,
    timestamp
  });
  saveLocalMessages(messages);
  return { success: true, local: true };
};

export const getMessages = (onUpdate) => {
  if (db) {
    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    return onSnapshot(q, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      onUpdate(messages);
    }, (error) => {
      console.error("Firestore listen error:", error);
      // Fallback
      onUpdate(getLocalMessages().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
    });
  }

  // LocalStorage Mode
  const messages = getLocalMessages().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  onUpdate(messages);
  
  // Return a dummy unsubscribe function
  return () => {};
};

export const deleteMessage = async (id) => {
  if (db && !id.startsWith("local_")) {
    try {
      await deleteDoc(doc(db, "messages", id));
      return { success: true };
    } catch (error) {
      console.error("Firestore delete error:", error);
    }
  }

  // LocalStorage Mode
  let messages = getLocalMessages();
  messages = messages.filter(m => m.id !== id);
  saveLocalMessages(messages);
  return { success: true };
};
export const getConfigurationState = () => {
  return {
    isFirebaseConfigured: isFirebaseConfigured(),
    usingFirebase: !!db
  };
};
