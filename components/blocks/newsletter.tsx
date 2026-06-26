'use client';

import { useState, type FormEvent } from 'react';
import { Silkscreen, Space_Mono } from 'next/font/google';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PageBlocksNewsletter } from '../../tina/__generated__/types';
import { Section } from '../layout/section';
import styles from './newsletter.module.scss';

// Pixel display font for the headline, monospace for body copy — the
// retro "artisanal" type pairing that drives the block's look.
const pixelFont = Silkscreen({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });
const monoFont = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' });

// Pragmatic email check: non-empty local part, single @, a dotted domain.
// Deliberately simple — full RFC 5322 validation is overkill for a UI demo.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'success' | 'error';

/**
 * Newsletter Subscription block.
 *
 * UI-only: validates the email format and required privacy consent, then
 * shows success/error feedback. No real email service is called (per the
 * brief) — `successMessage` is displayed as if the signup had been accepted.
 */
export const Newsletter = ({ data }: { data: PageBlocksNewsletter }) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const errorText = data.errorMessage || 'Please enter a valid email address.';
  const successText = data.successMessage || 'Thanks for subscribing!';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1) Email format.
    if (!EMAIL_REGEX.test(email.trim())) {
      setStatus('error');
      setMessage(errorText);
      return;
    }

    // 2) Privacy consent is mandatory.
    if (!consent) {
      setStatus('error');
      setMessage('Please accept the privacy policy to continue.');
      return;
    }

    // 3) Success — no network call, just UI feedback.
    setStatus('success');
    setMessage(successText);
    setEmail('');
    setConsent(false);
  };

  const isError = status === 'error';

  return (
    <Section background={data.background!}>
      <div className={`${styles.newsletter} ${monoFont.className}`}>
        {/* Headline — rich-text; bold segments are styled as accent highlights (see .scss) */}
        {data.heading && (
          <div className={`${styles.title} ${pixelFont.className}`} data-tina-field={tinaField(data, 'heading')}>
            <TinaMarkdown content={data.heading} />
          </div>
        )}

        {/* Short description */}
        {data.subheading && (
          <div className={styles.description} data-tina-field={tinaField(data, 'subheading')}>
            <TinaMarkdown content={data.subheading} />
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="email"
              placeholder={data.placeholder || 'you@example.com'}
              aria-label="Email address"
              aria-invalid={isError}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className={styles.button} type="submit" data-tina-field={tinaField(data, 'buttonLabel')}>
              {data.buttonLabel || 'Subscribe'}
            </button>
          </div>

          {/* Privacy policy consent */}
          {data.privacyLabel && (
            <label className={styles.consent}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              <span className={styles.consentText} data-tina-field={tinaField(data, 'privacyLabel')}>
                <TinaMarkdown content={data.privacyLabel} />
              </span>
            </label>
          )}

          {/* Validation / submission feedback. aria-live announces it to AT. */}
          {status !== 'idle' && (
            <p
              className={`${styles.feedback} ${isError ? styles.error : styles.success}`}
              role="status"
              aria-live="polite"
              data-tina-field={tinaField(data, isError ? 'errorMessage' : 'successMessage')}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
};
