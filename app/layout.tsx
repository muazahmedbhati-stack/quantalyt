import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Tracker from '@/components/Tracker';

export const metadata: Metadata = {
  title: {
    default: 'Quantalyt — Premium AI Agency | Web Development, AI Agents & Automation',
    template: '%s | Quantalyt',
  },
  description:
    'Quantalyt is a next-generation AI agency delivering premium web development, AI agents, automation, custom chatbots, CRM systems, and digital marketing for global businesses.',
  keywords: [
    'AI agency',
    'web development',
    'AI automation',
    'custom chatbots',
    'AI agents',
    'CRM development',
    'SEO agency',
    'digital transformation',
    'Pakistan AI agency',
    'US clients AI agency',
  ],
  authors: [{ name: 'Quantalyt' }],
  creator: 'Quantalyt',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantalyt.com',
    title: 'Quantalyt — Premium AI Agency',
    description: 'Transform your business with AI — Web Development, Automation, Chatbots, CRM & More.',
    siteName: 'Quantalyt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantalyt — Premium AI Agency',
    description: 'Transform your business with AI — Web Development, Automation, Chatbots, CRM & More.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Quantalyt',
              url: 'https://quantalyt.com',
              logo: 'https://quantalyt.com/logo.png',
              description: 'Premium AI Agency offering Web Development, AI Agents, Automation, and more.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+92-339-7444694',
                contactType: 'customer service',
                availableLanguage: ['English'],
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="noise">
        <SmoothScroll>
          <CustomCursor />
          <Tracker />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#10121E',
                color: '#E8EDF5',
                border: '1px solid rgba(108, 142, 255, 0.3)',
              },
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
