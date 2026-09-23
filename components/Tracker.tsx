'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, getSessionId } from '@/lib/tracking';

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize session
    getSessionId();
    // Track page view
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
