import { UAParser } from 'ua-parser-js';

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('q_session');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('q_session', sessionId);
  }
  return sessionId;
}

export function parseUserAgent(ua: string) {
  const parser = new UAParser(ua);
  const result = parser.getResult();
  
  return {
    browser: result.browser.name || 'Unknown',
    os: result.os.name || 'Unknown',
    deviceType: result.device.type || 'desktop',
  };
}

export async function trackPageView(pagePath: string) {
  const sessionId = getSessionId();
  if (!sessionId) return;
  
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, pagePath }),
    });
  } catch {}
}
