// You can get your free Formspree Form ID by registering at https://formspree.io/
export const FORMSPREE_FORM_ID = "xoqgzpzk"; // Replace with your Formspree Form ID

export const saveMessage = async (name, email, message) => {
  const endpoint = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ name, email, message })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit form to Formspree');
  }

  return { success: true };
};

// Dummy exports to maintain compatibility with existing imports
export const getMessages = (onUpdate) => {
  onUpdate([]);
  return () => {};
};

export const deleteMessage = async (id) => {
  return { success: true };
};

export const getConfigurationState = () => {
  return {
    isFirebaseConfigured: false,
    usingFirebase: false
  };
};
