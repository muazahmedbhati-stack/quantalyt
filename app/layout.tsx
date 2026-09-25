import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Tracker from '@/components/Tracker';

export const viewport: Viewport = {
  themeColor: '#0A0C14',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://quantalyt.com'),
  title: {
    default: 'Quantalyt — Autonomous AI Systems, AI Voice Agents & Web Development Studio',
    template: '%s | Quantalyt',
  },
  description:
    'Quantalyt is an elite AI engineering studio delivering autonomous multi-agent systems, sub-500ms AI voice telephony, custom Next.js web applications, and enterprise workflow automations for US founders and global enterprises.',
  applicationName: 'Quantalyt',
  authors: [{ name: 'Quantalyt Engineering', url: 'https://quantalyt.com' }],
  generator: 'Next.js',
  keywords: [
    'AI agency',
    'AI voice agents',
    'autonomous AI agents',
    'AI phone answering service',
    'voice telephony automation',
    'Next.js web development agency',
    'custom AI chatbots',
    'DeepSeek R1 integration',
    'enterprise workflow automation',
    'bilingual AI voice agents',
    'US software development studio',
    'Quantalyt',
    'quantalyt.com',
    'AI CRM integration',
    'high ticket AI engineering',
    'AI consulting for startups',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Quantalyt',
  publisher: 'Quantalyt',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: 'https://quantalyt.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://quantalyt.com',
    siteName: 'Quantalyt',
    title: 'Quantalyt — Autonomous AI Systems, AI Voice Agents & Web Development Studio',
    description:
      'High-performance AI voice agents, autonomous multi-agent systems, and custom web applications for US and global enterprises.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Quantalyt — Autonomous AI Systems & Voice Telephony Studio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantalyt — Autonomous AI Systems & Voice Telephony Studio',
    description:
      'High-performance AI voice agents, autonomous multi-agent systems, and custom web applications for US and global enterprises.',
    images: ['https://quantalyt.com/og-image.jpg'],
    creator: '@quantalyt',
    site: '@quantalyt',
  },
  icons: {
    icon: [
      { url: '/icon.jpg', sizes: 'any', type: 'image/jpeg' },
      { url: '/icon.jpg', sizes: '192x192', type: 'image/jpeg' },
      { url: '/icon.jpg', sizes: '512x512', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/icon.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    shortcut: '/icon.jpg',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://quantalyt.com/#website',
      url: 'https://quantalyt.com',
      name: 'Quantalyt',
      description: 'Autonomous AI Systems, AI Voice Telephony & Next.js Web Development Studio',
      publisher: { '@id': 'https://quantalyt.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://quantalyt.com/#organization',
      name: 'Quantalyt',
      legalName: 'Quantalyt AI Agency',
      url: 'https://quantalyt.com',
      logo: 'https://quantalyt.com/logo.jpg',
      image: 'https://quantalyt.com/og-image.jpg',
      description:
        'Quantalyt is an enterprise AI agency delivering autonomous agents, AI voice telephony, custom Next.js platforms, and workflow automation.',
      telephone: '+92-339-7444694',
      email: 'contact@quantalyt.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+92-339-7444694',
          contactType: 'sales',
          areaServed: ['US', 'GB', 'CA', 'AE', 'PK', 'Worldwide'],
          availableLanguage: ['English', 'Urdu'],
        },
      ],
      sameAs: ['https://github.com/muazahmedbhati-stack/quantalyt'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://quantalyt.com/#service',
      name: 'Quantalyt AI Agency',
      url: 'https://quantalyt.com',
      image: 'https://quantalyt.com/og-image.jpg',
      telephone: '+92-339-7444694',
      priceRange: '$$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Wire Transfer, Stripe, Credit Card, Crypto',
      areaServed: ['US', 'GB', 'CA', 'AE', 'PK', 'Worldwide'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Quantalyt AI & Software Engineering Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Autonomous AI Voice Telephony & Cold Outreach',
              description:
                'Sub-500ms conversational AI voice agents capable of handling inbound customer qualification, booking, and outbound calls.',
            },
            price: '1200',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Growth AI Stack & Custom Next.js Platform',
              description:
                'Production full-stack web platforms integrated with custom autonomous AI agents, DeepSeek-R1, and real-time CRM.',
            },
            price: '3500',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Enterprise Autonomous Pod & Multi-Agent Architecture',
              description:
                'Dedicated engineering squad for custom LLM fine-tuning, complex multi-agent workflows, and enterprise infrastructure.',
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://quantalyt.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does Quantalyt specialize in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Quantalyt specializes in Autonomous AI Agents, sub-500ms AI Voice Telephony Systems, High-Velocity Next.js 14 Web Development, Custom DeepSeek-R1 LLM integrations, and Enterprise Workflow Automation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Quantalyt integrate AI Voice Agents with real phone numbers and WhatsApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Quantalyt engineers conversational voice agents connected directly to Twilio/SIP phone lines with ultra-low sub-500ms latency, as well as multi-channel WhatsApp and web chatbot automations.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the pricing model for engineering sprints at Quantalyt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer transparent fixed-scope sprints: Sprint MVP at $1,200, Growth AI Stack at $3,500, and Custom Enterprise Pods for dedicated engineering and high-scale architecture.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Quantalyt collaborate with US and international enterprise clients?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We guarantee a 4 to 6-hour daily timezone overlap with US EST and PST, daily asynchronous Slack/Loom video updates, private GitHub repository access, and direct hotline access.',
          },
        },
        {
          '@type': 'Question',
          name: 'How quickly can Quantalyt deploy an initial AI agent or web MVP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our Sprint MVP is engineered and deployed in 7 to 10 business days with full documentation, automated CI/CD, and live testing.',
          },
        },
      ],
    },
  ],
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
            __html: JSON.stringify(jsonLdGraph),
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
