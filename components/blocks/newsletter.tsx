'use client';

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

/**
 * Newsletter Subscription block.
 *
 * Static render only at this stage: it shows every CMS-editable element
 * (headline, description, email field, button, privacy consent) but the
 * form is not yet interactive — validation and success/error feedback are
 * added in the next step.
 */
export const Newsletter = ({ data }: { data: PageBlocksNewsletter }) => {
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

        {/* Subscription form — interactivity added in a later step */}
        <form className={styles.form}>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              type="email"
              placeholder={data.placeholder || 'you@example.com'}
              aria-label="Email address"
            />
            <button
              className={styles.button}
              type="submit"
              data-tina-field={tinaField(data, 'buttonLabel')}
            >
              {data.buttonLabel || 'Subscribe'}
            </button>
          </div>

          {/* Privacy policy consent */}
          {data.privacyLabel && (
            <label className={styles.consent}>
              <input type="checkbox" className={styles.checkbox} />
              <span
                className={styles.consentText}
                data-tina-field={tinaField(data, 'privacyLabel')}
              >
                <TinaMarkdown content={data.privacyLabel} />
              </span>
            </label>
          )}
        </form>
      </div>
    </Section>
  );
};
