import type { Template } from 'tinacms';
import { sectionBlockSchemaField } from '../layout/section';

/**
 * TinaCMS schema for the Newsletter Subscription block.
 *
 * Kept in its own file (no component / no .scss imports) because the Tina
 * config bundles this schema with esbuild, which has no loader for SCSS
 * modules. The React component lives in `newsletter.tsx`.
 */
export const newsletterBlockSchema: Template = {
  name: 'newsletter',
  label: 'Newsletter',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      heading: {
        type: 'root',
        children: [
          {
            type: 'h2',
            children: [
              { type: 'text', text: 'Subscribe to our ' },
              { type: 'text', text: 'newsletter', bold: true },
            ],
          },
        ],
      },
      subheading: {
        type: 'root',
        children: [
          {
            type: 'p',
            children: [
              {
                type: 'text',
                text: 'Get the latest updates delivered straight to your inbox. No spam, unsubscribe anytime.',
              },
            ],
          },
        ],
      },
      placeholder: 'you@example.com',
      buttonLabel: 'Subscribe',
      privacyLabel: {
        type: 'root',
        children: [
          {
            type: 'p',
            children: [{ type: 'text', text: 'I agree to the privacy policy.' }],
          },
        ],
      },
      successMessage: 'Thanks for subscribing! Please check your inbox.',
      errorMessage: 'Please enter a valid email address.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'rich-text',
      label: 'Heading',
      name: 'heading',
      description: 'Headline. Bold text renders as an accent highlight.',
    },
    {
      type: 'rich-text',
      label: 'Subheading',
      name: 'subheading',
    },
    {
      type: 'string',
      label: 'Email Placeholder',
      name: 'placeholder',
    },
    {
      type: 'string',
      label: 'Button Label',
      name: 'buttonLabel',
    },
    {
      type: 'rich-text',
      label: 'Privacy Consent Label',
      name: 'privacyLabel',
      description: 'Shown next to the consent checkbox. Supports links.',
    },
    {
      type: 'string',
      label: 'Success Message',
      name: 'successMessage',
    },
    {
      type: 'string',
      label: 'Error Message',
      name: 'errorMessage',
    },
  ],
};
