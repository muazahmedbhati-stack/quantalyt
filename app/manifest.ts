import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Quantalyt — Autonomous AI Systems & Studio',
    short_name: 'Quantalyt',
    description:
      'Autonomous AI Agents, Sub-500ms Voice Telephony & High-Velocity Next.js Web Development Studio.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06070B',
    theme_color: '#0A0C14',
    icons: [
      {
        src: '/icon.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/icon.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
