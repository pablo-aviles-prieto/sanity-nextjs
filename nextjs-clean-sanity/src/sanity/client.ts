import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '0hwa2z9r',
  dataset: 'production',
  apiVersion: '2025-03-08',
  useCdn: false,
});
