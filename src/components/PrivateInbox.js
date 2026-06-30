import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftIcon, 
  TrashIcon, 
  ClipboardDocumentIcon, 
  CheckIcon, 
  EnvelopeIcon, 
  CalendarIcon, 
  UserIcon, 
  CircleStackIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { getMessages, deleteMessage, getConfigurationState } from '../services/messageService';

const PrivateInbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [showConfigGuide, setShowConfigGuide] = useState(false);
  const configState = getConfigurationState();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = getMessages((data) => {
      setMessages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      await deleteMessage(id);
    }
  };

  const handleCopyEmail = (id, email) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  const handleGoBack = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Dashboard Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <CircleStackIcon className="h-8 w-8" />
            </span>
            <div>
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">Secret Console</span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2 mt-0.5">
                Salmi.Dev <span className="text-gray-500">{"//"}</span> Inbox
              </h1>
            </div>
          </div>
          
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-primary/5 text-sm font-semibold transition-all duration-300 cursor-pointer"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </button>
        </header>

        {/* Local Storage fallback Warning banner */}
        {!configState.isFirebaseConfigured && (
          <div className="mb-10 p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-yellow-300">⚠️ Local Storage Mode Active</h4>
                <p className="text-sm text-yellow-400/80 mt-1">
                  Messages are currently saved locally on your device. To enable database persistence for real users, you need to configure Firebase.
                </p>
              </div>
              <button
                onClick={() => setShowConfigGuide(!showConfigGuide)}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider transition-colors hover:bg-yellow-300 cursor-pointer"
              >
                {showConfigGuide ? 'Hide Guide' : 'Setup Firebase'}
              </button>
            </div>

            {/* Setup Firebase Guide */}
            {showConfigGuide && (
              <div className="mt-6 pt-6 border-t border-yellow-500/20 text-gray-300 space-y-4 text-sm bg-black/40 p-5 rounded-xl leading-relaxed">
                <h5 className="font-bold text-yellow-300 text-base">Setup Firebase Firestore in 4 Simple Steps:</h5>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Go to the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-yellow-400">Firebase Console</a> and click <strong>Add Project</strong>.</li>
                  <li>Click on <strong>Firestore Database</strong> in the left sidebar and select <strong>Create Database</strong>. Choose <strong>Test Mode</strong> so it accepts messages without rules.</li>
                  <li>Go to <strong>Project Settings</strong> (gear icon), scroll to the bottom, register a <strong>Web App</strong>, and copy the `firebaseConfig` object keys.</li>
                  <li>Open the project file <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">src/config/firebaseConfig.js</code> and paste the keys inside the object.</li>
                </ol>
                <p className="text-xs text-gray-400 mt-2">
                  * Note: Once you save `firebaseConfig.js`, the service will automatically switch to Firestore and database persistence will be active!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
            <ArrowPathIcon className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-semibold tracking-wider">Syncing Inbox...</p>
          </div>
        ) : messages.length === 0 ? (
          /* Empty State */
          <div className="text-center py-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-2xl mx-auto p-8 shadow-xl">
            <EnvelopeIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No messages received yet</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
              Your inbox is empty. Test the form by submitting a question from the contact section on the homepage!
            </p>
            <button 
              onClick={handleGoBack}
              className="mt-6 px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider transition-colors hover:bg-primary/90 cursor-pointer"
            >
              Test Form Now
            </button>
          </div>
        ) : (
          /* Inbox Messages List */
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-400 tracking-wider flex items-center gap-2">
              <span>All Submissions ({messages.length})</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className="relative group bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/45 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-white/5">
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white flex items-center gap-2 leading-tight">
                          <UserIcon className="h-4.5 w-4.5 text-primary flex-shrink-0" />
                          {msg.name}
                        </h4>
                        
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <EnvelopeIcon className="h-3.5 w-3.5 flex-shrink-0" />
                          <a href={`mailto:${msg.email}`} className="hover:underline hover:text-primary transition-colors">{msg.email}</a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        {/* Copy button */}
                        <button
                          onClick={() => handleCopyEmail(msg.id, msg.email)}
                          title="Copy Email"
                          className="p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <CheckIcon className="h-4 w-4 text-green-400" />
                          ) : (
                            <ClipboardDocumentIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Message content */}
                    <div className="bg-black/30 rounded-xl p-4 border border-white/5 mb-6 text-sm text-gray-300 font-medium leading-relaxed min-h-[80px] break-words whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>

                  {/* Date & Actions */}
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>{formatTime(msg.timestamp)}</span>
                    </div>
                    
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PrivateInbox;
