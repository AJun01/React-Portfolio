import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import DOMPurify from 'dompurify';
import styles from './ContactMenu.module.css';

export default function ContactMenu() {
  const initial = { name: '', email: '', message: '' };
  const [formData,  setFormData]  = useState(initial);
  const [errors,    setErrors]    = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSent,    setIsSent]    = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim())    e.name    = 'NAME REQUIRED';
    if (!formData.email.trim())   e.email   = 'EMAIL REQUIRED';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                  e.email   = 'INVALID FORMAT';
    if (!formData.message.trim()) e.message = 'MESSAGE REQUIRED';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsLoading(true);
    const payload = {
      name:    'Name: '    + DOMPurify.sanitize(formData.name),
      email:   'Email: '   + DOMPurify.sanitize(formData.email),
      message: 'Message: ' + DOMPurify.sanitize(formData.message),
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        payload,
        process.env.REACT_APP_EMAILJS_USER_ID,
      )
      .then(() => { setFormData(initial); setErrors({}); setIsSent(true); })
      .catch((err) => console.error('Email failed:', err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.panel}>
      <div className={styles.card}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>[ SIGNAL TRANSMISSION ]</span>
          <span className={styles.headerSub}>ESTABLISH DIRECT COMMS CHANNEL</span>
        </header>

        {isSent ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <span className={styles.successTitle}>TRANSMISSION COMPLETE</span>
            <p className={styles.successMsg}>
              Signal received.<br />
              I'll get back to you shortly.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="ct-name">OPERATOR ID</label>
              <input
                className={`${styles.input}${errors.name ? ` ${styles.hasError}` : ''}`}
                id="ct-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="name"
              />
              {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ct-email">COMM FREQUENCY</label>
              <input
                className={`${styles.input}${errors.email ? ` ${styles.hasError}` : ''}`}
                id="ct-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
              />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="ct-message">TRANSMISSION</label>
              <textarea
                className={`${styles.textarea}${errors.message ? ` ${styles.hasError}` : ''}`}
                id="ct-message"
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="off"
              />
              {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
            </div>

            <button
              className={styles.submit}
              type="submit"
              disabled={isLoading}
              data-loading={isLoading ? 'true' : undefined}
            >
              {isLoading ? 'TRANSMITTING' : '[ SEND TRANSMISSION ]'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
