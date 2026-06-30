import React, { useState } from 'react';
import { saveMessage } from '../services/messageService';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      await saveMessage(formData.name, formData.email, formData.message);
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: 'Message sent successfully!' },
      });
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Something went wrong. Please try again later.' },
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative group">
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="peer w-full px-4 py-3 bg-white/5 border-2 border-white/10 text-white rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 placeholder-transparent"
          placeholder="Name"
        />
        <label
          htmlFor="name"
          className="absolute left-4 -top-2.5 bg-[#0F172A] px-2 text-sm text-gray-400 transition-all duration-300
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5
                   peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
        >
          Name
        </label>
      </div>

      <div className="relative group">
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="peer w-full px-4 py-3 bg-white/5 border-2 border-white/10 text-white rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 placeholder-transparent"
          placeholder="Email"
        />
        <label
          htmlFor="email"
          className="absolute left-4 -top-2.5 bg-[#0F172A] px-2 text-sm text-gray-400 transition-all duration-300
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5
                   peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
        >
          Email
        </label>
      </div>

      <div className="relative group">
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="peer w-full px-4 py-3 bg-white/5 border-2 border-white/10 text-white rounded-lg focus:outline-none focus:border-primary transition-colors duration-300 placeholder-transparent resize-none"
          placeholder="Message"
        />
        <label
          htmlFor="message"
          className="absolute left-4 -top-2.5 bg-[#0F172A] px-2 text-sm text-gray-400 transition-all duration-300
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5
                   peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary"
        >
          Message
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={status.submitting}
          className="w-full btn-primary bg-gradient-to-r from-gradient-start to-gradient-end transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {status.submitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </div>

      {status.info.msg && (
        <div
          className={`text-center p-4 rounded-lg ${
            status.info.error ? 'bg-red-900/30 text-red-200 border border-red-500/30' : 'bg-green-900/30 text-green-200 border border-green-500/30'
          }`}
        >
          {status.info.msg}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
